// src/commands/remove.ts

import { MyContext } from '../types'
import { removeProductFromUser } from '../database/queries/product'
import { t } from '../i18n'

export async function removeCommand(ctx: MyContext) {
    const telegramId = ctx.from?.id
    const text = ctx.message?.text || ''
    const parts = text.split(' ')
    const productName = parts.slice(1).join(' ').trim().toLowerCase()

    if (!telegramId || !productName) {
        return ctx.reply(t(ctx, 'remove.usage'))
    }

    const result = await removeProductFromUser(telegramId, productName)
    if (result.success) {
        return ctx.reply(
            t(ctx, 'remove.success', { productName }),
            { parse_mode: 'Markdown' }
        )
    } else if (result.reason === 'not_found') {
        return ctx.reply(
            t(ctx, 'remove.notFound', { productName }),
            { parse_mode: 'Markdown' }
        )
    } else if (result.reason === 'not_in_list') {
        return ctx.reply(
            t(ctx, 'remove.notInList', { productName }),
            { parse_mode: 'Markdown' }
        )
    }
}
