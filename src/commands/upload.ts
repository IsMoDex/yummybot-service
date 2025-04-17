import { Context, InlineKeyboard } from 'grammy';
import axios, { AxiosError } from 'axios';
import { recognizeProducts } from '../services/imageService';
import { saveImageUpload } from '../database/queries/image';
import prisma from '../database/client';
import { recognizedCache, CACHE_TTL } from '../cache/recognizedCache';

export async function uploadCommand(ctx: Context) {
    // Проверяем, что пользователь действительно отправил фото после /upload
    const photo = ctx.message?.photo;
    if (!photo) {
        return ctx.reply('❗ Пожалуйста, сначала отправьте команду /upload, а затем фотографию.');
    }

    const fileId = photo[photo.length - 1].file_id;
    const token  = process.env.BOT_TOKEN!;
    let link: string;

    // 1) Получаем file_path у Telegram
    try {
        const file = await ctx.api.getFile(fileId);
        link = `https://api.telegram.org/file/bot${token}/${file.file_path}`;
    } catch (err) {
        console.error('Telegram.getFile error:', err);
        return ctx.reply('🚨 Не удалось получить файл из Telegram. Попробуйте позже.');
    }

    // 2) Скачиваем картинку (таймаут 2 минуты)
    let buffer: Buffer;
    try {
        const resp = await axios.get<ArrayBuffer>(link, {
            responseType: 'arraybuffer',
            timeout: 120_000,
        });
        buffer = Buffer.from(resp.data);
    } catch (err) {
        console.error('Download error:', err);
        const e = err as AxiosError;
        if (e.code === 'ETIMEDOUT' || e.code === 'ECONNABORTED') {
            return ctx.reply('🚨 Превышено время ожидания при скачивании изображения. Попробуйте позже.');
        }
        return ctx.reply('🚨 Ошибка при скачивании изображения. Попробуйте ещё раз.');
    }

    // 3) Сохраняем факт загрузки
    await saveImageUpload(ctx.from!.id, link);

    // 4) Распознаём продукты через сервис
    let results: { class: string; confidence: number }[];
    try {
        results = await recognizeProducts(buffer);
    } catch (err) {
        console.error('Recognition error:', err);
        return ctx.reply('🚨 Ошибка сервиса распознавания. Попробуйте позже.');
    }

    // 5) Фильтруем по уверенности ≥ 40%
    const filtered = results
        .filter(r => r.confidence >= 0.5)
        .map(r => r.class.toLowerCase());
    if (filtered.length === 0) {
        return ctx.reply('ℹ На фото не найдено продуктов с уверенностью ≥ 50%.');
    }

    // 6) Оставляем только те, что есть в справочнике
    const uniqueIds = Array.from(new Set(filtered));
    const catalog = await prisma.product.findMany({
        where: { id: { in: uniqueIds } },
        select: { id: true },
    }).then(rows => rows.map(r => r.id));
    if (catalog.length === 0) {
        return ctx.reply('⚠ Ни один из распознанных продуктов не найден в справочнике.');
    }

    // 7) Строим текст и inline-кнопки
    const text = `🔍 Найдено в справочнике (${catalog.length}):\n` +
        catalog.map(id => `• \`${id}\``).join('\n');

    const kb = new InlineKeyboard()
        .text('➕ Добавить найденные', 'apply_add')
        .row()
        .text('🔄 Заменить список', 'apply_replace');

    // 8) Отправляем сообщение и сохраняем в кэш по message_id
    const sent = await ctx.reply(text, {
        parse_mode: 'Markdown',
        reply_markup: kb,
    });

    recognizedCache.set(sent.message_id, {
        ts: Date.now(),
        list: catalog,
    });

    // Очистка старых записей (опционально)
    for (const [msgId, entry] of recognizedCache) {
        if (Date.now() - entry.ts > CACHE_TTL) {
            recognizedCache.delete(msgId);
        }
    }
}