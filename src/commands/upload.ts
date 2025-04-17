import { Context } from 'grammy';
import axios, { AxiosError } from 'axios';
import { recognizeProducts } from '../services/imageService';
import { addProductToUser } from '../database/queries/product';
import { saveImageUpload } from '../database/queries/image';

export async function uploadCommand(ctx: Context) {
    // Проверяем, что пришло фото
    const photo = ctx.message?.photo;
    if (!photo) {
        return ctx.reply('❗ Пожалуйста, сначала отправьте команду /upload, а затем фотографию.');
    }

    const fileId = photo[photo.length - 1].file_id;
    const token  = process.env.BOT_TOKEN!;
    let link: string;

    try {
        const file = await ctx.api.getFile(fileId);
        link = `https://api.telegram.org/file/bot${token}/${file.file_path}`;
    } catch (err) {
        console.error('Telegram.getFile error:', err);
        return ctx.reply('🚨 Не удалось получить файл из Telegram. Попробуйте чуть позже.');
    }

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
            return ctx.reply('🚨 Превышено время ожидания при скачивании изображения. Попробуйте ещё раз чуть позже.');
        }
        return ctx.reply('🚨 Ошибка при скачивании изображения. Попробуйте ещё раз.');
    }

    await saveImageUpload(ctx.from!.id, link);

    let results: { class: string; confidence: number }[];
    try {
        results = await recognizeProducts(buffer);
    } catch (err) {
        console.error('Recognition error:', err);
        return ctx.reply('🚨 Ошибка сервиса распознавания. Попробуйте ещё раз позже.');
    }

    // Фильтруем по порогу уверенности ≥ 0.5
    const filtered = results.filter(r => r.confidence >= 0.5);
    if (!filtered.length) {
        return ctx.reply('ℹ На фото не найдено продуктов с достаточной уверенностью распознавания (≥ 50%).');
    }

    // Уникальные machine‑ID
    const classes = Array.from(new Set(filtered.map(r => r.class.toLowerCase())));

    const added:    string[] = [];
    const already:  string[] = [];
    const notFound: string[] = [];

    for (const cls of classes) {
        const res = await addProductToUser(ctx.from!.id, cls);
        if (res.success)                added.push(cls);
        else if (res.reason === 'already_exists') already.push(cls);
        else if (res.reason === 'not_found')      notFound.push(cls);
    }

    let reply = `🔍 Распознано (${filtered.length} объектов ≥ 50%):\n` +
        classes.map(c => `• \`${c}\``).join('\n') +
        `\n\n`;

    if (added.length)    reply += `✅ Добавлено: ${added.map(c => `\`${c}\``).join(', ')}\n`;
    if (already.length)  reply += `ℹ Уже в списке: ${already.map(c => `\`${c}\``).join(', ')}\n`;
    if (notFound.length) reply += `⚠ Не найдено в справочнике: ${notFound.map(c => `\`${c}\``).join(', ')}\n`;

    return ctx.reply(reply, { parse_mode: 'Markdown' });
}
