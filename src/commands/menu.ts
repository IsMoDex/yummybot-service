import { mainKeyboard } from '../keyboards/mainKeyboard';
import {Context} from "grammy";

export default async function menu(ctx: Context) {
    await ctx.reply(
        'Меню: выбирай, что нужно сделать:',
        { reply_markup: mainKeyboard }
    );
}