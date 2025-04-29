// src/utils/pagination.ts

import { MyContext, MySession } from '../types'
import { InlineKeyboard } from 'grammy'
import { t } from '../i18n'

export interface NavSessionKey {
    chat: number
    message_id: number
}

/** Удаляет прошлую навигацию */
export async function cleanupNav<K extends keyof MySession>(
    ctx: MyContext,
    sessionKey: K
): Promise<void> {
    const nav = ctx.session[sessionKey] as NavSessionKey | undefined
    if (nav) {
        try { await ctx.api.deleteMessage(nav.chat, nav.message_id) } catch {}
        delete ctx.session[sessionKey]
    }
}

/**
 * Рисует навигацию страниц:
 * - prefix: префикс callback data, например 'recipes_page'
 * - page: текущая страница 0-based
 * - totalItems: число элементов
 * - pageSize: размер страницы
 * - sessionKey: куда сохранить ID навигационного сообщения
 */
export async function renderNav<K extends keyof MySession>(
    ctx: MyContext,
    prefix: string,
    page: number,
    totalItems: number,
    pageSize: number,
    sessionKey: K
): Promise<void> {
    const totalPages = Math.ceil(totalItems / pageSize)
    // Если всего одна страница — не выводим навигацию
    if (totalPages <= 1) return

    // Индикатор страниц: ● — текущая, ○ — остальные
    const indicator = Array.from({ length: totalPages }, (_, i) =>
        i === page ? '●' : '○'
    ).join(' ')

    // Собираем клавиатуру
    const kb = new InlineKeyboard()
    if (page > 0) {
        kb.text(t(ctx, 'pagination.prev'), `${prefix}_${page - 1}`)
    }
    if (page + 1 < totalPages) {
        kb.text(t(ctx, 'pagination.next'), `${prefix}_${page + 1}`)
    }

    // Заголовок с номером страницы, мультиязычный
    // ключи в локалях: "pagination.header": "Стр. {current}/{total}" или "Page {current}/{total}"
    const header = t(ctx, 'pagination.header', {
        current: page + 1,
        total: totalPages,
    })

    const navText = `${header}\n${indicator}`

    const sent = await ctx.reply(navText, {
        reply_markup: kb,
        parse_mode: 'Markdown',
    })

    // Сохраняем в сессии
    ctx.session[sessionKey] = {
        chat: sent.chat.id,
        message_id: sent.message_id,
    } as unknown as MySession[typeof sessionKey]
}
