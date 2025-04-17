import { Context } from 'grammy';
import { removeProductFromUser } from '../database/queries/product';

export async function removeCommand(ctx: Context) {
    const telegramId = ctx.from?.id;
    const text = ctx.message?.text || '';
    const parts = text.split(' ');
    const productName = parts.slice(1).join(' ').trim().toLowerCase();

    if (!telegramId || !productName) {
        return ctx.reply('❗ Использование: /remove <название продукта>');
    }

    const result = await removeProductFromUser(telegramId, productName);

    if (result.success) {
        return ctx.reply(`🗑️ Продукт *${productName}* удалён из вашего списка.`, {
            parse_mode: 'Markdown',
        });
    } else if (result.reason === 'not_found') {
        return ctx.reply(`⚠️ Продукт *${productName}* не найден в справочнике.`, {
            parse_mode: 'Markdown',
        });
    } else if (result.reason === 'not_in_list') {
        return ctx.reply(`ℹ️ Продукта *${productName}* нет в вашем списке.`, {
            parse_mode: 'Markdown',
        });
    }
}
