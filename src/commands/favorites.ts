import { Context, InlineKeyboard } from 'grammy';
import { getUserFavoriteRecipes } from '../database/queries/recipe';

export async function favoritesCommand(ctx: Context) {
    const telegramId = ctx.from?.id;
    const lang = ctx.from?.language_code || 'ru';

    if (!telegramId) {
        return ctx.reply('Ошибка: не удалось определить пользователя.');
    }

    const favs = await getUserFavoriteRecipes(telegramId, lang);

    if (favs.length === 0) {
        return ctx.reply('У вас пока нет сохранённых рецептов. Используйте /recipes, чтобы найти и сохранить их.');
    }

    for (let i = 0; i < favs.length; i++) {
        const r = favs[i];
        const ingredients = r.ingredients.map(i => `${i.emoji} ${i.name}`).join(', ');
        const text = `*${i + 1}. ${r.title}*\n` +
            `Ингредиенты: ${ingredients}`;

        const kb = new InlineKeyboard()
            .text('📝 Показать рецепт', `show_${r.id}`)
            .row()
            .text('🗑️ Удалить из избранного', `delete_${r.id}`);

        await ctx.reply(text, {
            parse_mode: 'Markdown',
            reply_markup: kb,
        });
    }
}
