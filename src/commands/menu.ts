// src/commands/menu.ts

import { MyContext } from '../types'
import { t } from '../i18n'
import { mainKeyboard } from '../keyboards/mainKeyboard'

export default async function menu(ctx: MyContext) {
    await ctx.reply(
        t(ctx, 'menu.prompt'),
        { reply_markup: mainKeyboard(ctx) }
    )
}
