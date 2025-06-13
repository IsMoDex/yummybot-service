// src/commands/remove.ts

import { MyContext } from '../types'
import { removeProductFromUser } from '../database/queries/product'
import { saveInteraction } from '../database/queries/history'
import { t } from '../i18n'

export async function removeCommand(ctx: MyContext) {
    const telegramId = ctx.from?.id
    const text = ctx.message?.text || ''
    const parts = text.split(' ')
    const nameInput = parts.slice(1).join(' ').trim()
    const productName = nameInput.toLowerCase()

    if (!telegramId || !productName) {
        return ctx.reply(t(ctx, 'remove.usage'))
    }

    const result = await removeProductFromUser(telegramId, productName)
    if (result.success) {
        // логируем в историю
        await saveInteraction(telegramId, 'remove_product', { productName })
        return ctx.reply(
            t(ctx, 'remove.success', { productName: nameInput }),
            { parse_mode: 'Markdown' }
        )
    } else if (result.reason === 'not_in_list') {
        return ctx.reply(
            t(ctx, 'remove.notInList', { productName: nameInput }),
            { parse_mode: 'Markdown' }
        )
    } else {
        return ctx.reply(
            t(ctx, 'remove.notFound', { productName: nameInput }),
            { parse_mode: 'Markdown' }
        )
    }
}
