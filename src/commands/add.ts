import { Context } from 'grammy';
import { addProductToUser } from '../database/queries/product';

export async function addCommand(ctx: Context) {
    const telegramId = ctx.from?.id;
    const text = ctx.message?.text || '';
    const parts = text.split(' ');
    const productName = parts.slice(1).join(' ').trim().toLowerCase();

    if (!telegramId || !productName) {
        return ctx.reply('❗ Использование: /add <название продукта>');
    }

    const result = await addProductToUser(telegramId, productName);

    if (result.success) {
        return ctx.reply(`✅ Продукт *${productName}* добавлен в ваш список!`, {
            parse_mode: 'Markdown',
        });
    } else if (result.reason === 'not_found') {
        return ctx.reply(`⚠️ Продукт *${productName}* не найден в справочнике.`, {
            parse_mode: 'Markdown',
        });
    } else if (result.reason === 'already_exists') {
        return ctx.reply(`ℹ️ Продукт *${productName}* уже есть в вашем списке.`, {
            parse_mode: 'Markdown',
        });
    }
}
