import { Context } from 'grammy';
import { clearUserProducts } from '../database/queries/product';

export async function clearCommand(ctx: Context) {
    const telegramId = ctx.from?.id;
    if (!telegramId) {
        return ctx.reply('Ошибка: не удалось определить пользователя.');
    }

    const deleted = await clearUserProducts(telegramId);
    if (deleted > 0) {
        return ctx.reply(`🗑️ Удалено ${deleted} продуктов из вашего списка.`);
    } else {
        return ctx.reply('Ваш список продуктов уже пуст.');
    }
}
