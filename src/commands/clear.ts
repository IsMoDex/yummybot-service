// src/commands/clear.ts

import { MyContext } from '../types'
import { clearUserProducts } from '../database/queries/product'
import { t } from '../i18n'

export async function clearCommand(ctx: MyContext) {
    const telegramId = ctx.from?.id
    if (!telegramId) {
        return ctx.reply(t(ctx, 'clear.errorNoUser'))
    }
    const deleted = await clearUserProducts(telegramId)
    if (deleted > 0) {
        return ctx.reply(t(ctx, 'clear.deleted', { count: deleted }))
    } else {
        return ctx.reply(t(ctx, 'clear.alreadyEmpty'))
    }
}
