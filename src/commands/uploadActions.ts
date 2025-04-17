import { Context } from 'grammy';
import {
    recognizedCache,
    CACHE_TTL,
} from '../cache/recognizedCache';
import {
    addProductToUser,
    clearUserProducts,
} from '../database/queries/product';

async function getCacheList(ctx: Context): Promise<string[]|null> {
    const msg = ctx.callbackQuery?.message;
    if (!msg) return null;
    const entry = recognizedCache.get(msg.message_id);
    if (!entry) return null;
    // проверяем TTL
    if (Date.now() - entry.ts > CACHE_TTL) {
        recognizedCache.delete(msg.message_id);
        return null;
    }
    // удаляем после чтения
    recognizedCache.delete(msg.message_id);
    return entry.list;
}

export async function applyAddAction(ctx: Context) {
    const list = await getCacheList(ctx);
    if (!list) {
        return ctx.answerCallbackQuery({
            text: '⚠ Данные устарели. Пожалуйста, отправьте фото снова через /upload.',
            show_alert: true,
        });
    }
    const userId = ctx.from!.id;
    let added = 0;
    for (const id of list) {
        const res = await addProductToUser(userId, id);
        if (res.success) added++;
    }
    await ctx.editMessageReplyMarkup(); // убираем кнопки
    return ctx.reply(`✅ Добавлено продуктов: ${added}`);
}

export async function applyReplaceAction(ctx: Context) {
    const list = await getCacheList(ctx);
    if (!list) {
        return ctx.answerCallbackQuery({
            text: '⚠ Данные устарели. Пожалуйста, отправьте фото снова через /upload.',
            show_alert: true,
        });
    }
    const userId = ctx.from!.id;
    // очищаем и добавляем
    await clearUserProducts(userId);
    let added = 0;
    for (const id of list) {
        const res = await addProductToUser(userId, id);
        if (res.success) added++;
    }
    await ctx.editMessageReplyMarkup();
    return ctx.reply(`🔄 Список заменён. Добавлено продуктов: ${added}`);
}
