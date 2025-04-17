import { Context, InlineKeyboard } from 'grammy';
import { getRecipeRecommendations } from '../database/queries/recipe';

export async function recipesCommand(ctx: Context) {
    const telegramId = ctx.from?.id;
    if (!telegramId) {
        return ctx.reply('Ошибка: не удалось определить пользователя.');
    }

    const recs = await getRecipeRecommendations(telegramId, 5);

    if (recs.length === 0) {
        return ctx.reply('Не нашлось рецептов по вашим продуктам. Добавьте ещё ингредиентов.');
    }

    for (let i = 0; i < recs.length; i++) {
        const r = recs[i];
        const text = `*${i + 1}. ${r.title}*\n` +
            `Ингредиенты: ${r.matchedCount}/${r.totalIngredients} совпало` +
            (r.favProductMatches > 0
                ? ` (в том числе ${r.favProductMatches} из ваших ♥️)`
                : '') +
            (r.description ? `\n${r.description}` : '');

        const kb = new InlineKeyboard()
            .text('📝 Показать рецепт', `show_${r.id}`)
            .row()
            .text('❤️ Сохранить рецепт', `save_${r.id}`);

        await ctx.reply(text, {
            parse_mode: 'Markdown',
            reply_markup: kb,
        });
    }
}
