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
    if (!products.length) {
        return ctx.reply(
            'У вас пока нет добавленных продуктов. Добавьте их через /add или загрузите фото через /upload'
        )
    }

    // Кнопки “Добавить” / “Убрать”
    const kb = new InlineKeyboard()
        .text('➕ Добавить', 'prompt_add')
        .text('➖ Убрать',   'prompt_remove')

    // Формируем список в Markdown
    const list = products
        .map((entry, i) => `${i + 1}. ${entry.emoji} ${entry.name}`)
        .join('\n')

    // Отправляем и сохраняем ссылку на это сообщение в сессии
    const sent = await ctx.reply(
        `*Ваши продукты:*\n\n${list}`,
        { reply_markup: kb, parse_mode: 'Markdown' }
    )
    ctx.session.lastProductsMessage = {
        chat: sent.chat.id,
        message_id: sent.message_id,
    }
}
