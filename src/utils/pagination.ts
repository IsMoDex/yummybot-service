// src/utils/pagination.ts

import { MyContext, MySession } from '../types'
import { InlineKeyboard } from 'grammy'

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
 * - page: текущая страница 0‑based
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
    const indicator = Array.from({ length: totalPages }, (_, i) =>
        i === page ? '●' : '○'
    ).join(' ')

    // Собираем клавиатуру
    const kb = new InlineKeyboard()
    if (page > 0) {
        kb.text('◀️ Назад', `${prefix}_${page - 1}`)
    }
    if (page + 1 < totalPages) {
        kb.text('Вперёд ▶️', `${prefix}_${page + 1}`)
    }

    // Текст сообщения = номер страницы + индикатор
    const navText = `Стр. ${page + 1}/${totalPages}\n${indicator}`

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
