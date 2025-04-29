// src/commands/help.ts

import { MyContext } from '../types'
import { t } from '../i18n'

export async function helpCommand(ctx: MyContext) {
    // отправляем полный справочный текст
    return ctx.reply(t(ctx, 'help.text'), { parse_mode: 'Markdown' })
}
