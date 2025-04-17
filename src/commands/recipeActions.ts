import { Context } from 'grammy';
import {
    getRecipeById,
    saveFavoriteRecipe,
    removeFavoriteRecipe
} from '../database/queries/recipe';

export async function showRecipeAction(ctx: Context) {
    // Пример callback data: "show_42"
    const data = ctx.callbackQuery?.data;
    if (!data) return;
    const [, idStr] = data.split('_');
    const recipeId = Number(idStr);
    if (isNaN(recipeId)) return;

    const lang = ctx.from?.language_code || 'ru';
    const recipe = await getRecipeById(recipeId, lang);
    if (!recipe) {
        await ctx.answerCallbackQuery({ text: 'Рецепт не найден', show_alert: true });
        return;
    }

    // Подготовим текст рецепта
    const ingredientsList = recipe.ingredients
        .map(i => `${i.emoji} ${i.name}`)
        .join('\n');

    const text = `*${recipe.title}*\n\n` +
        (recipe.description ? `${recipe.description}\n\n` : '') +
        `*Ингредиенты:*\n${ingredientsList}\n\n` +
        `*Шаги:*\n${recipe.steps}`;

    // Отвечаем пользователю
    await ctx.reply(text, { parse_mode: 'Markdown' });
    await ctx.answerCallbackQuery(); // просто закрываем "часики"
}

export async function saveRecipeAction(ctx: Context) {
    // Пример callback data: "save_42"
    const data = ctx.callbackQuery?.data;
    if (!data) return;
    const [, idStr] = data.split('_');
    const recipeId = Number(idStr);
    if (isNaN(recipeId)) return;

    const telegramId = ctx.from?.id;
    if (!telegramId) return;

    const result = await saveFavoriteRecipe(telegramId, recipeId);
    if (result.success) {
        await ctx.answerCallbackQuery({ text: 'Рецепт сохранён в избранное 👍', show_alert: false });
    } else if (result.reason === 'already_exists') {
        await ctx.answerCallbackQuery({ text: 'Уже в избранном', show_alert: false });
    } else {
        await ctx.answerCallbackQuery({ text: 'Ошибка при сохранении', show_alert: true });
    }
}

/**
 * callback data: "delete_42"
 */
export async function deleteRecipeAction(ctx: Context) {
    const data = ctx.callbackQuery?.data;
    if (!data) return;
    const [, idStr] = data.split('_');
    const recipeId = Number(idStr);
    if (isNaN(recipeId)) return;

    const telegramId = ctx.from?.id;
    if (!telegramId) return;

    const result = await removeFavoriteRecipe(telegramId, recipeId);
    if (result.success) {
        // удаляем само сообщение‑карточку из чата
        await ctx.deleteMessage();
        await ctx.answerCallbackQuery({ text: 'Рецепт удалён из избранного', show_alert: false });
    } else {
        await ctx.answerCallbackQuery({ text: 'Не удалось удалить рецепт', show_alert: true });
    }
}