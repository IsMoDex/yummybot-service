import { Context } from 'grammy';
import { findUser, createUser } from '../database/queries/user';
import {mainKeyboard} from "../keyboards/mainKeyboard";

export async function startCommand(ctx: Context) {
    const telegramId = ctx.from?.id;

    if (!telegramId) {
        return ctx.reply("Не удалось определить ваш Telegram ID.");
    }

    const existingUser = await findUser(telegramId);

    if (existingUser) {
        return ctx.reply(`С возвращением, ${existingUser.firstName || 'друг'}! 👋`, { reply_markup: mainKeyboard });
    }

    await createUser(ctx);
    return ctx.reply(
        `Привет! 👋 Я помогу тебе распознавать продукты в холодильнике и подсказывать рецепты. Для начала отправь фото содержимого холодильника или воспользуйся командой /help.`,
        { reply_markup: mainKeyboard }
    );
}
