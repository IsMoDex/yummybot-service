// src/commands/start.ts

import { MyContext } from '../types'
import { findUser, createUser } from '../database/queries/user'
import { mainKeyboard } from '../keyboards/mainKeyboard'
import { t } from '../i18n'

export async function startCommand(ctx: MyContext) {
    const telegramId = ctx.from?.id
    if (!telegramId) {
        return ctx.reply(t(ctx, 'start.errorNoId'))
    }

    const user = await findUser(telegramId)
    const firstName = ctx.from.first_name || ''
    if (user) {
        return ctx.reply(
            t(ctx, 'start.returning', { firstName }),
            { reply_markup: mainKeyboard(ctx) }
        )
    }

    await createUser(ctx)
    return ctx.reply(
        t(ctx, 'start.greeting', { firstName }),
        { reply_markup: mainKeyboard(ctx) }
    )
}
