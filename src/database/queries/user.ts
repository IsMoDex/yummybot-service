import prisma from '../client';
import { Context } from 'grammy';

export async function findUser(telegramId: number) {
    return await prisma.user.findUnique({
        where: { telegramId },
    });
}

export async function createUser(ctx: Context) {
    const from = ctx.from;
    if (!from) return null;

    return await prisma.user.create({
        data: {
            telegramId: from.id,
            username: from.username || null,
            firstName: from.first_name || null,
            languageCode: from.language_code || null,
        },
    });
}
