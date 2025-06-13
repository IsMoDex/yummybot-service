// src/commands/history.ts

import { MyContext } from '../types'
import { getRecentHistory } from '../database/queries/history'
import { t } from '../i18n'

/**
 * /history — показать ленту действий за последний час
 */
export async function historyCommand(ctx: MyContext) {
    const telegramId = ctx.from?.id
    if (!telegramId) {
        return ctx.reply(t(ctx, 'history.errorNoUser'))
    }
    const entries = await getRecentHistory(telegramId)
    if (entries.length === 0) {
        return ctx.reply(t(ctx, 'history.noEntries'))
    }

    const header = `*${t(ctx, 'history.header')}*`

    const lines = entries.map(e => {
        const time = e.createdAt
            .toLocaleTimeString(ctx.from?.language_code || 'ru', { hour12: false })
        // подбираем эмодзи по типу
        let emoji = '❔'
        switch (e.type) {
            case 'add_product':      emoji = '➕'; break
            case 'remove_product':   emoji = '➖'; break
            case 'clear_products':   emoji = '🗑️'; break
            case 'upload':           emoji = '📤'; break
            case 'show_recipe':      emoji = '👀'; break
            case 'save_recipe':      emoji = '❤️'; break
            case 'remove_favorite':  emoji = '🗑️'; break
        }
        // теперь берём описание из локалей: history.event.{type}
        const label = t(ctx, `history.event.${e.type}`)
        return `${emoji} [${time}] ${label}`
    })

    return ctx.reply(
        [header, '', ...lines].join('\n'),
        { parse_mode: 'Markdown' }
    )
}
