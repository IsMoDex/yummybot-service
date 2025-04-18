// src/commands/products.ts

import { MyContext } from '../types'
import { getUserProducts } from '../database/queries/product'
import { InlineKeyboard } from 'grammy'

export async function productsCommand(ctx: MyContext) {
    const telegramId = ctx.from?.id
    const lang = ctx.from?.language_code || 'ru'
    if (!telegramId) {
        return ctx.reply('Ошибка: не удалось определить пользователя.')
    }

    const products = await getUserProducts(telegramId, lang)

    // Построим клавиатуру и текст в зависимости от наличия продуктов
    let text: string
    const kb = new InlineKeyboard()

    if (products.length === 0) {
        text = 'У вас пока нет добавленных продуктов.\nНажмите «➕ Добавить» чтобы добавить первый.'
        kb.text('➕ Добавить', 'prompt_add')
    } else {
        const list = products
            .map((entry, i) => `${i + 1}. ${entry.emoji} ${entry.name}`)
            .join('\n')
        text = `*Ваши продукты:*\n\n${list}`
        kb
            .text('➕ Добавить', 'prompt_add')
            .text('➖ Убрать',   'prompt_remove')
    }

    // Отправляем сообщение (или редактируем в дальнейшем)
    const sent = await ctx.reply(text, {
        reply_markup: kb,
        // парсить Markdown только если есть список
        ...(products.length > 0 ? { parse_mode: 'Markdown' as const } : {}),
    })

    // Сохраняем последний список в сессии, даже если он пуст
    ctx.session.lastProductsMessage = {
        chat: sent.chat.id,
        message_id: sent.message_id,
    }
}
