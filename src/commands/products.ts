// src/commands/products.ts

import { MyContext } from '../types'
import { getUserProducts } from '../database/queries/product'
import { InlineKeyboard } from 'grammy'
import { t } from '../i18n'

export async function productsCommand(ctx: MyContext) {
    const telegramId = ctx.from?.id
    if (!telegramId) {
        return ctx.reply(t(ctx, 'products.errorNoUser'))
    }
    const lang = ctx.from.language_code || 'en'
    const products = await getUserProducts(telegramId, lang)

    let text: string
    const kb = new InlineKeyboard()

    if (products.length === 0) {
        // если товаров нет — одна кнопка «Добавить»
        text = `*${t(ctx, 'products.noItems')}*`
        kb.text(t(ctx, 'keyboard.add'), 'prompt_add')
    } else {
        // если товары есть — заголовок + простой список
        const header = t(ctx, 'products.header') // e.g. "Ваши продукты:"
        const separator = '─'.repeat(header.length)
        const listLines = products.map((p, i) => {
            const idx = i + 1
            return `${idx}. ${p.emoji} ${p.name}`
        })
        text = [
            `*${header}*`,
            separator,
            ...listLines
        ].join('\n')

        // Общие кнопки «Добавить»/«Убрать»
        kb
            .text(t(ctx, 'keyboard.add'), 'prompt_add')
            .text(t(ctx, 'keyboard.remove'), 'prompt_remove')
    }

    const sent = await ctx.reply(text, {
        reply_markup: kb,
        ...(products.length > 0 ? { parse_mode: 'Markdown' as const } : {}),
    })

    // Запомним, чтобы потом редактировать
    ctx.session.lastProductsMessage = {
        chat: sent.chat.id,
        message_id: sent.message_id,
    }
}
