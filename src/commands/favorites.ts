// src/commands/favorites.ts

import { MyContext } from '../types'
import { getUserFavoriteRecipes } from '../database/queries/recipe'
import { RECIPE_PAGE_SIZE } from '../config'
import { cleanupNav, renderNav } from '../utils/pagination'
import { InlineKeyboard } from 'grammy'

/**
 * /favorites — загрузка и показ первой страницы
 */
export async function favoritesCommand(ctx: MyContext) {
    const telegramId = ctx.from!.id
    const lang = ctx.from?.language_code || 'ru'
    const favs = await getUserFavoriteRecipes(telegramId, lang)
    if (!favs.length) {
        return ctx.reply('У вас пока нет сохранённых рецептов. Используйте /recipes для поиска.')
    }
    ctx.session.favs = favs
    ctx.session.favoritePage = 0
    ctx.session.lastFavoriteMessageIds = []
    await cleanupNav(ctx, 'lastFavoritesNavMessageId')
    return renderFavoritesPage(ctx)
}

/**
 * Обработчик callback для страниц /favorites
 */
export async function favoritesPageHandler(ctx: MyContext) {
    const [, , pageStr] = ctx.callbackQuery!.data!.split('_') // favorites_page_<n>
    ctx.session.favoritePage = parseInt(pageStr, 10)
    await ctx.answerCallbackQuery()
    await cleanupFavoritesPage(ctx)
    return renderFavoritesPage(ctx)
}

/** Рендер страницы избранного */
async function renderFavoritesPage(ctx: MyContext) {
    const favs = ctx.session.favs!
    const page = ctx.session.favoritePage!
    const start = page * RECIPE_PAGE_SIZE
    const slice = favs.slice(start, start + RECIPE_PAGE_SIZE)

    ctx.session.lastFavoriteMessageIds = []
    for (let i = 0; i < slice.length; i++) {
        const r = slice[i]
        const num = start + i + 1
        const ings = r.ingredients.map((i) => `${i.emoji} ${i.name}`).join(', ')
        const text = `*${num}. ${r.title}*\nИнгредиенты: ${ings}`

        const kb = new InlineKeyboard()
            .text('Показать рецепт', `show_${r.id}`)
            .text('❌ Удалить',        `delete_${r.id}`)

        const sent = await ctx.reply(text, {
            parse_mode: 'Markdown',
            reply_markup: kb,
        })
        ctx.session.lastFavoriteMessageIds!.push({
            chat: sent.chat.id,
            message_id: sent.message_id,
        })
    }

    // навигация
    await renderNav(
        ctx,
        'favorites_page',
        page,
        (ctx.session.favs || []).length,
        RECIPE_PAGE_SIZE,
        'lastFavoritesNavMessageId'
    )
}

/** Удаление предыдущей страницы избранного */
async function cleanupFavoritesPage(ctx: MyContext) {
    const msgs = ctx.session.lastFavoriteMessageIds || []
    for (const m of msgs) {
        try { await ctx.api.deleteMessage(m.chat, m.message_id) } catch {}
    }
    delete ctx.session.lastFavoriteMessageIds
    await cleanupNav(ctx, 'lastFavoritesNavMessageId')
}
