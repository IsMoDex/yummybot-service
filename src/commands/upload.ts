// src/commands/upload.ts

import { MyContext } from '../types'
import { InlineKeyboard } from 'grammy'
import axios, { AxiosError } from 'axios'
import { recognizeProducts } from '../services/imageService'
import { saveImageUpload } from '../database/queries/image'
import prisma from '../database/client'
import { recognizedCache, CACHE_TTL } from '../cache/recognizedCache'
import { t } from '../i18n'

export async function uploadCommand(ctx: MyContext) {
    const lang = ctx.from?.language_code || 'en'
    const photo = ctx.message?.photo
    if (!photo) {
        return ctx.reply(t(ctx, 'upload.noPhoto'))
    }

    // 0) Уведомляем пользователя, что фото получено и началась обработка
    await ctx.reply(t(ctx, 'upload.processing'))

    const fileId = photo[photo.length - 1].file_id
    const token = process.env.BOT_TOKEN!
    let link: string

    // 1) Получить ссылку на файл
    try {
        const file = await ctx.api.getFile(fileId)
        link = `https://api.telegram.org/file/bot${token}/${file.file_path}`
    } catch {
        return ctx.reply(t(ctx, 'upload.getFileError'))
    }

    // 2) Скачать содержимое
    let buffer: Buffer
    try {
        const resp = await axios.get<ArrayBuffer>(link, {
            responseType: 'arraybuffer',
            timeout: 120_000,
        })
        buffer = Buffer.from(resp.data)
    } catch (err) {
        const e = err as AxiosError
        if (e.code === 'ETIMEDOUT' || e.code === 'ECONNABORTED') {
            return ctx.reply(t(ctx, 'upload.downloadTimeout'))
        }
        return ctx.reply(t(ctx, 'upload.downloadError'))
    }

    // 3) Сохранить факт загрузки
    await saveImageUpload(ctx.from!.id, link)

    // 4) Распознать продукты
    let results: { class: string; confidence: number }[]
    try {
        results = await recognizeProducts(buffer)
    } catch {
        return ctx.reply(t(ctx, 'upload.recognitionError'))
    }

    // 5) Отфильтровать по confidence ≥ 0.5
    const filtered = results
        .filter(r => r.confidence >= 0.5)
        .map(r => r.class.toLowerCase())

    if (filtered.length === 0) {
        return ctx.reply(t(ctx, 'upload.noProductsDetected'))
    }

    // 6) Только те, что есть в каталоге
    const uniqueIds = Array.from(new Set(filtered))
    const products = await prisma.product.findMany({
        where: { id: { in: uniqueIds } },
        include: {
            translations: {
                where: { language: lang },
                select: { name: true, emoji: true },
            },
        },
    })
    if (!products.length) {
        return ctx.reply(t(ctx, 'upload.noneInCatalog'))
    }

    // 7) Построить текст с нормальными именами
    const lines = products.map(p => {
        const tr = p.translations[0]
        const name = tr?.name ?? p.id
        const emoji = tr?.emoji ?? ''
        return `• ${emoji} ${name}`
    })
    const text =
        t(ctx, 'upload.foundCatalog', { count: products.length }) +
        '\n' +
        lines.join('\n')

    // 8) Inline-клавиатура
    const kb = new InlineKeyboard()
        .text(t(ctx, 'keyboard.addFound'), 'apply_add')
        .row()
        .text(t(ctx, 'keyboard.replaceList'), 'apply_replace')

    // 9) Отправить и закешировать по message_id
    const sent = await ctx.reply(text, {
        parse_mode: 'Markdown',
        reply_markup: kb,
    })

    recognizedCache.set(sent.message_id, {
        ts: Date.now(),
        list: products.map(p => p.id),
    })

    // Удалить устаревшие записи
    for (const [msgId, entry] of recognizedCache) {
        if (Date.now() - entry.ts > CACHE_TTL) {
            recognizedCache.delete(msgId)
        }
    }
}
