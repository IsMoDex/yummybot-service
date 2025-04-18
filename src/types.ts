// src/types.ts

import { Context, SessionFlavor } from 'grammy';

export interface MySession {
    action?: 'add' | 'remove';
    page?: number;
    lastResults?: Array<{
        productId: string;
        name: string;
        emoji: string | null;
    }>;
    // Для редактирования списка /products
    lastProductsMessage?: {
        chat: number;
        message_id: number;
    };
}

export type MyContext = Context & SessionFlavor<MySession>;
