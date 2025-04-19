// src/commands/recipes.ts

import { MyContext } from '../types'
import { InlineKeyboard } from 'grammy'
import { getRecipeRecommendations } from '../database/queries/recipe'
import { RECIPE_PAGE_SIZE } from '../config'
import { cleanupNav, renderNav } from '../utils/pagination'

/**
 * /recipes — загрузка и показ первой страницы
 */
export async function recipesCommand(ctx: MyContext) {
    const telegramId = ctx.from!.id
    const recs = await getRecipeRecommendations(telegramId, 1000)
    if (!recs.length) {
        return ctx.reply('Не нашлось рецептов по вашим продуктам. Добавьте ещё ингредиентов.')
    }
    ctx.session.recs = recs
    ctx.session.recipePage = 0
    ctx.session.lastRecipeMessageIds = []
    await cleanupNav(ctx, 'lastRecipesNavMessageId')
    return renderRecipePage(ctx)
}

/**
 * Обработчик callback для страниц /recipes
 */
export async function recipesPageHandler(ctx: MyContext) {
    const [, , pageStr] = ctx.callbackQuery!.data!.split('_') // recipes_page_<n>
    ctx.session.recipePage = parseInt(pageStr, 10)
    await ctx.answerCallbackQuery()
    await cleanupRecipePage(ctx)
    return renderRecipePage(ctx)
}

/** Рендер страницы рецептов */
async function renderRecipePage(ctx: MyContext) {
    const recs = ctx.session.recs!
    const page = ctx.session.recipePage!
    const start = page * RECIPE_PAGE_SIZE
    const slice = recs.slice(start, start + RECIPE_PAGE_SIZE)

    ctx.session.lastRecipeMessageIds = []
    // отправка каждого рецепта
    for (let i = 0; i < slice.length; i++) {
        const r = slice[i]
        const num = start + i + 1
        const text = [
            `*${num}. ${r.title}*`,
            `Ингредиенты: ${r.matchedCount}/${r.totalIngredients}` +
            (r.favProductMatches ? ` (♥️ ${r.favProductMatches})` : ''),
            r.description || '',
        ].filter(Boolean).join('\n')

        const kb = new InlineKeyboard()
            .text('Показать рецепт', `show_${r.id}`)
            .text('❤️ Сохранить',     `save_${r.id}`)

        const sent = await ctx.reply(text, {
            parse_mode: 'Markdown',
            reply_markup: kb,
        })
        ctx.session.lastRecipeMessageIds!.push({
            chat: sent.chat.id,
            message_id: sent.message_id,
        })
    }

    // навигация
    await renderNav(
        ctx,
        'recipes_page',
        page,
        recs.length,
        RECIPE_PAGE_SIZE,
        'lastRecipesNavMessageId'
    )
}

/** Удаление предыдущей страницы */
async function cleanupRecipePage(ctx: MyContext) {
    const msgs = ctx.session.lastRecipeMessageIds || []
    for (const m of msgs) {
        try { await ctx.api.deleteMessage(m.chat, m.message_id) } catch {}
    }
    delete ctx.session.lastRecipeMessageIds
    await cleanupNav(ctx, 'lastRecipesNavMessageId')
}
