// src/database/queries/history.ts

import prisma from '../client';

export interface HistoryEntry {
    id: number;
    type: string;
    payload: any;
    createdAt: Date;
}

/**
 * Сохраняет элемент истории взаимодействия.
 * Принимает telegramId, а внутри ищет user.id и уже его кладёт в FK.
 */
export async function saveInteraction(
    telegramId: number,
    type: string,
    payload: any
): Promise<void> {
    // 1) Находим внутреннего пользователя
    const user = await prisma.user.findUnique({
        where: { telegramId },
        select: { id: true },
    });
    if (!user) {
        // Если пользователя нет, пропускаем — можно залогировать по-желанию
        return;
    }

    // 2) Сохраняем историю с правильным userId
    await prisma.interactionHistory.create({
        data: {
            userId: user.id,
            type,
            payload,
        },
    });
}

/**
 * Берёт все элементы истории за последний час для данного пользователя.
 */
export async function getRecentHistory(
    telegramId: number
): Promise<HistoryEntry[]> {
    // Находим внутреннего пользователя
    const user = await prisma.user.findUnique({
        where: { telegramId },
        select: { id: true },
    });
    if (!user) {
        return [];
    }

    const oneHourAgo = new Date(Date.now() - 1000 * 60 * 60);
    return prisma.interactionHistory.findMany({
        where: {
            userId: user.id,
            createdAt: { gte: oneHourAgo },
        },
        orderBy: { createdAt: 'desc' },
    });
}
