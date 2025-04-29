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

    const fileId = photo[photo.length - 1].file_id
    const token  = process.env.BOT_TOKEN!
    let link: string

    try {
        const file = await ctx.api.getFile(fileId)
        link = `https://api.telegram.org/file/bot${token}/${file.file_path}`
    } catch {
        return ctx.reply(t(ctx, 'upload.getFileError'))
    }

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

    await saveImageUpload(ctx.from!.id, link)

    let results: { class: string; confidence: number }[]
    try {
        results = await recognizeProducts(buffer)
    } catch {
        return ctx.reply(t(ctx, 'upload.recognitionError'))
    }

    const filtered = results
        .filter(r => r.confidence >= 0.5)
        .map(r => r.class.toLowerCase())
    if (filtered.length === 0) {
        return ctx.reply(t(ctx, 'upload.noProductsDetected'))
    }

    const uniqueIds = Array.from(new Set(filtered))
    const catalog = await prisma.product.findMany({
        where: { id: { in: uniqueIds } },
        select: { id: true },
    }).then(rows => rows.map(r => r.id))
    if (!catalog.length) {
        return ctx.reply(t(ctx, 'upload.noneInCatalog'))
    }

    const text = t(ctx, 'upload.foundCatalog', { count: catalog.length }) +
        '\n' +
        catalog.map(id => `• \`${id}\``).join('\n')

    const kb = new InlineKeyboard()
        .text(t(ctx, 'keyboard.addFound'), 'apply_add')
        .row()
        .text(t(ctx, 'keyboard.replaceList'), 'apply_replace')

    const sent = await ctx.reply(text, {
        parse_mode: 'Markdown',
        reply_markup: kb,
    })

    recognizedCache.set(sent.message_id, {
        ts: Date.now(),
        list: catalog,
    })

    // очистка устаревших
    for (const [msgId, entry] of recognizedCache) {
        if (Date.now() - entry.ts > CACHE_TTL) {
            recognizedCache.delete(msgId)
        }
    }
}
