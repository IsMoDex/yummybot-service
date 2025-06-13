// src/commands/clear.ts

import { MyContext } from '../types'
import { clearUserProducts } from '../database/queries/product'
import { saveInteraction } from '../database/queries/history'
import { t } from '../i18n'

export async function clearCommand(ctx: MyContext) {
    const telegramId = ctx.from?.id
    if (!telegramId) {
        return ctx.reply(t(ctx, 'clear.errorNoUser'))
    }

    const deleted = await clearUserProducts(telegramId)
    if (deleted > 0) {
        // сохраняем в историю очистки
        await saveInteraction(telegramId, 'clear_products', { count: deleted })

        return ctx.reply(
            t(ctx, 'clear.success', { count: deleted }),
            { parse_mode: 'Markdown' }
        )
    } else {
        return ctx.reply(t(ctx, 'clear.empty'))
    }
}
