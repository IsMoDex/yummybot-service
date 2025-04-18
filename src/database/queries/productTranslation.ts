// src/database/queries/productTranslation.ts

import prisma from '../client';

export interface TranslationEntry {
    productId: string;
    name: string;
    emoji: string | null;
}

/**
 * Ищет точное совпадение названия в нужном языке.
 */
export async function findExactTranslations(
    language: string,
    name: string
): Promise<TranslationEntry[]> {
    return prisma.productTranslation.findMany({
        where: { language, name },
        select: { productId: true, name: true, emoji: true },
    });
}

/**
 * Ищет продукты, у которых name содержит подстроку input.
 */
export async function searchTranslations(
    language: string,
    input: string
): Promise<TranslationEntry[]> {
    return prisma.productTranslation.findMany({
        where: { language, name: { contains: input } },
        select: { productId: true, name: true, emoji: true },
    });
}

/**
 * Берёт name и emoji для конкретного productId+language.
 */
export async function getTranslationById(
    productId: string,
    language: string
): Promise<{ name: string; emoji: string | null } | null> {
    return prisma.productTranslation.findFirst({
        where: { productId, language },
        select: { name: true, emoji: true },
    });
}
