// src/commands/recipeActions.ts

import { MyContext } from '../types'
import {
    getRecipeById,
    saveFavoriteRecipe,
    removeFavoriteRecipe,
} from '../database/queries/recipe'
import { t } from '../i18n'

export async function showRecipeAction(ctx: MyContext) {
    const data = ctx.callbackQuery?.data
    if (!data) return
    const recipeId = Number(data.split('_')[1])
    if (isNaN(recipeId)) return

    const ctxLang = ctx.from?.language_code || 'en'
    const recipe = await getRecipeById(recipeId, ctxLang)
    if (!recipe) {
        await ctx.answerCallbackQuery({
            text: t(ctx, 'recipe.notFound'),
            show_alert: true,
        })
        return
    }

    const ingredientsList = recipe.ingredients
        .map(i => `${i.emoji} ${i.name}`)
        .join('\n')

    const text = [
        `*${recipe.title}*`,
        recipe.description || '',
        `*${t(ctx, 'recipe.ingredients')}:*`,
        ingredientsList,
        `*${t(ctx, 'recipe.steps')}:*`,
        recipe.steps,
    ].filter(Boolean).join('\n\n')

    await ctx.reply(text, { parse_mode: 'Markdown' })
    await ctx.answerCallbackQuery()
}

export async function saveRecipeAction(ctx: MyContext) {
    const data = ctx.callbackQuery?.data
    if (!data) return
    const recipeId = Number(data.split('_')[1])
    if (isNaN(recipeId)) return

    const telegramId = ctx.from?.id
    if (!telegramId) return

    const res = await saveFavoriteRecipe(telegramId, recipeId)
    if (res.success) {
        await ctx.answerCallbackQuery({ text: t(ctx, 'recipe.saved') })
    } else if (res.reason === 'already_exists') {
        await ctx.answerCallbackQuery({ text: t(ctx, 'recipe.alreadySaved') })
    } else {
        await ctx.answerCallbackQuery({ text: t(ctx, 'recipe.saveError'), show_alert: true })
    }
}

export async function deleteRecipeAction(ctx: MyContext) {
    const data = ctx.callbackQuery?.data
    if (!data) return
    const recipeId = Number(data.split('_')[1])
    if (isNaN(recipeId)) return

    const telegramId = ctx.from?.id
    if (!telegramId) return

    const res = await removeFavoriteRecipe(telegramId, recipeId)
    if (res.success) {
        await ctx.deleteMessage()
        await ctx.answerCallbackQuery({ text: t(ctx, 'recipe.deleted') })
    } else {
        await ctx.answerCallbackQuery({ text: t(ctx, 'recipe.deleteError'), show_alert: true })
    }
}
