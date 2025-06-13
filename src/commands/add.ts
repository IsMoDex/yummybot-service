// src/commands/add.ts

import { MyContext } from '../types'
import { addProductToUser } from '../database/queries/product'
import { saveInteraction } from '../database/queries/history'
import { t } from '../i18n'

export async function addCommand(ctx: MyContext) {
    const telegramId = ctx.from?.id
    const text = ctx.message?.text || ''
    const parts = text.split(' ')
    // сохраняем оригинальный ввод пользователя для показа в тексте
    const nameInput = parts.slice(1).join(' ').trim()
    const productName = nameInput.toLowerCase()

    if (!telegramId || !productName) {
        return ctx.reply(t(ctx, 'add.usage'))
    }

    const result = await addProductToUser(telegramId, productName)
    if (result.success) {
        // логируем в историю
        await saveInteraction(telegramId, 'add_product', { productName })
        return ctx.reply(
            t(ctx, 'add.success', { productName: nameInput }),
            { parse_mode: 'Markdown' }
        )
    } else if (result.reason === 'already_exists') {
        return ctx.reply(
            t(ctx, 'add.alreadyExists', { productName: nameInput }),
            { parse_mode: 'Markdown' }
        )
    } else {
        return ctx.reply(
            t(ctx, 'add.notFound', { productName: nameInput }),
            { parse_mode: 'Markdown' }
        )
    }
}
