// src/commands/add.ts

import { MyContext } from '../types'
import { addProductToUser } from '../database/queries/product'
import { t } from '../i18n'

export async function addCommand(ctx: MyContext) {
    const telegramId = ctx.from?.id
    const text = ctx.message?.text || ''
    const parts = text.split(' ')
    const productName = parts.slice(1).join(' ').trim().toLowerCase()

    if (!telegramId || !productName) {
        return ctx.reply(t(ctx, 'add.usage'))
    }

    const result = await addProductToUser(telegramId, productName)
    if (result.success) {
        return ctx.reply(
            t(ctx, 'add.success', { productName }),
            { parse_mode: 'Markdown' }
        )
    } else if (result.reason === 'not_found') {
        return ctx.reply(
            t(ctx, 'add.notFound', { productName }),
            { parse_mode: 'Markdown' }
        )
    } else if (result.reason === 'already_exists') {
        return ctx.reply(
            t(ctx, 'add.alreadyExists', { productName }),
            { parse_mode: 'Markdown' }
        )
    }
}
