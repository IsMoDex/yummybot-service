// src/types.ts

import { Context, SessionFlavor } from 'grammy';

export interface MySession {
    action?: 'add' | 'remove';
    page?: number;
    // В emoji может приходить null из БД, поэтому и в сессии пусть будет string | null
    lastResults?: Array<{
        productId: string;
        name: string;
        emoji: string | null;
    }>;
    lastProductsMessage?: { chat: number; message_id: number };
}

// Контекст бота с привязанной сессией
export type MyContext = Context & SessionFlavor<MySession>;
