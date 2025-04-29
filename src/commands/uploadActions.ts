// src/commands/uploadActions.ts

import { MyContext } from '../types'
import {
    recognizedCache,
    CACHE_TTL,
} from '../cache/recognizedCache'
import {
    addProductToUser,
    clearUserProducts,
} from '../database/queries/product'
import { t } from '../i18n'

async function getCacheList(ctx: MyContext): Promise<string[] | null> {
    const msg = ctx.callbackQuery?.message
    if (!msg) return null
    const entry = recognizedCache.get(msg.message_id)
    if (!entry) return null
    if (Date.now() - entry.ts > CACHE_TTL) {
        recognizedCache.delete(msg.message_id)
        return null
    }
    recognizedCache.delete(msg.message_id)
    return entry.list
}

export async function applyAddAction(ctx: MyContext) {
    const list = await getCacheList(ctx)
    if (!list) {
        return ctx.answerCallbackQuery({
            text: t(ctx, 'upload.cacheExpired'),
            show_alert: true,
        })
    }
    const userId = ctx.from!.id
    let added = 0
    for (const id of list) {
        const res = await addProductToUser(userId, id)
        if (res.success) added++
    }
    await ctx.editMessageReplyMarkup()
    return ctx.reply(
        t(ctx, 'upload.addedCount', { count: added }),
        { parse_mode: 'Markdown' }
    )
}

export async function applyReplaceAction(ctx: MyContext) {
    const list = await getCacheList(ctx)
    if (!list) {
        return ctx.answerCallbackQuery({
            text: t(ctx, 'upload.cacheExpired'),
            show_alert: true,
        })
    }
    const userId = ctx.from!.id
    await clearUserProducts(userId)
    let added = 0
    for (const id of list) {
        const res = await addProductToUser(userId, id)
        if (res.success) added++
    }
    await ctx.editMessageReplyMarkup()
    return ctx.reply(
        t(ctx, 'upload.replacedCount', { count: added }),
        { parse_mode: 'Markdown' }
    )
}
