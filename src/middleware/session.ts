// src/middleware/session.ts

import { session } from 'grammy';
import { MySession, MyContext } from '../types';

/**
 * Настраиваем встроенный session-мидлвар из grammY:
 *  - initial — задаёт пустую сессию
 *  - getSessionKey — ключ по chat.id
 */
export const sessionMiddleware = session<MySession, MyContext>({
    initial: () => ({}),
    getSessionKey: (ctx) => {
        // если нет чата (например, inline запросы без chat), не сохраняем сессию
        return ctx.chat?.id.toString() ?? '';
    },
});
