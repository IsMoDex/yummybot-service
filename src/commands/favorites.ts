// src/commands/favorites.ts

import { MyContext } from '../types'
import { getUserFavoriteRecipes } from '../database/queries/recipe'
import { RECIPE_PAGE_SIZE } from '../config'
import { cleanupNav, renderNav } from '../utils/pagination'
import { InlineKeyboard } from 'grammy'
import { t } from '../i18n'

export async function favoritesCommand(ctx: MyContext) {
    const telegramId = ctx.from?.id
    if (!telegramId) {
        return ctx.reply(t(ctx, 'favorites.errorNoUser'))
    }
    const lang = ctx.from.language_code || 'en'
    const favs = await getUserFavoriteRecipes(telegramId, lang)
    if (!favs.length) {
        return ctx.reply(t(ctx, 'favorites.noItems'))
    }

    ctx.session.favs = favs
    ctx.session.favoritePage = 0
    ctx.session.lastFavoriteMessageIds = []
    await cleanupNav(ctx, 'lastFavoritesNavMessageId')
    return renderFavoritesPage(ctx)
}

export async function favoritesPageHandler(ctx: MyContext) {
    const data = ctx.callbackQuery?.data
    if (!data) return
    const [, , pageStr] = data.split('_') // "favorites_page_<n>"
    ctx.session.favoritePage = parseInt(pageStr, 10)
    await ctx.answerCallbackQuery()
    await cleanupFavoritesPage(ctx)
    return renderFavoritesPage(ctx)
}

async function renderFavoritesPage(ctx: MyContext) {
    const favs = ctx.session.favs!
    const page = ctx.session.favoritePage!
    const start = page * RECIPE_PAGE_SIZE
    const slice = favs.slice(start, start + RECIPE_PAGE_SIZE)

    ctx.session.lastFavoriteMessageIds = []
    for (let i = 0; i < slice.length; i++) {
        const r = slice[i]
        const num = start + i + 1
        const ingredients = r.ingredients
            .map(i => `${i.emoji} ${i.name}`)
            .join(', ')
        const text = [
            `*${num}. ${r.title}*`,
            `${t(ctx, 'favorites.ingredients')}: ${ingredients}`,
        ].join('\n')

        const kb = new InlineKeyboard()
            .text(t(ctx, 'favorites.showRecipe'), `show_${r.id}`)
            .text(t(ctx, 'favorites.deleteRecipe'), `delete_${r.id}`)

        const sent = await ctx.reply(text, {
            parse_mode: 'Markdown',
            reply_markup: kb,
        })
        ctx.session.lastFavoriteMessageIds!.push({
            chat: sent.chat.id,
            message_id: sent.message_id,
        })
    }

    await renderNav(
        ctx,
        'favorites_page',
        page,
        (ctx.session.favs || []).length,
        RECIPE_PAGE_SIZE,
        'lastFavoritesNavMessageId'
    )
}

async function cleanupFavoritesPage(ctx: MyContext) {
    const msgs = ctx.session.lastFavoriteMessageIds || []
    for (const m of msgs) {
        try { await ctx.api.deleteMessage(m.chat, m.message_id) } catch {}
    }
    delete ctx.session.lastFavoriteMessageIds
    await cleanupNav(ctx, 'lastFavoritesNavMessageId')
}
