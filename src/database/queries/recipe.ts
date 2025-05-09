// src/database/queries/recipe.ts

import prisma from '../client'

export interface RecipeRecommendation {
    id: number
    title: string
    description: string | null
    steps: string | null
    matchedCount: number
    totalIngredients: number
}

export interface RecipeDetail {
    id: number
    title: string
    description: string | null
    steps: string | null
    ingredients: { productId: string; name: string; emoji: string }[]
}

/**
 * Список рекомендаций по рецептам, с учётом языка локали.
 * Сортировка:
 * 1) по общему числу ингредиентов (меньше → больше);
 * 2) при равном числе ингредиентов – по числу совпавших (больше → меньше).
 */
export async function getRecipeRecommendations(
    telegramId: number,
    limit = 5,
    language: string = 'en'
): Promise<RecipeRecommendation[]> {
    const user = await prisma.user.findUnique({
        where: { telegramId },
        select: { id: true },
    })
    if (!user) return []

    // Собираем продукты пользователя
    const userProds = await prisma.userProduct.findMany({
        where: { userId: user.id },
        select: { productId: true },
    })
    const userIds = new Set(userProds.map(p => p.productId))

    // Загружаем все рецепты с переводами и ингредиентами
    const recipes = await prisma.recipe.findMany({
        include: {
            translations: {
                where: { language },
                select: { title: true, description: true, steps: true },
            },
            ingredients: {
                select: { productId: true },
            },
        },
    })

    // Подсчитываем совпадения и формируем массив
    const scored = recipes
        .map(r => {
            const tr = r.translations[0]
            const ids = r.ingredients.map(i => i.productId)
            const matchedCount = ids.filter(id => userIds.has(id)).length
            return {
                id: r.id,
                title: tr?.title ?? `#${r.id}`,
                description: tr?.description ?? null,
                steps: tr?.steps ?? null,
                matchedCount,
                totalIngredients: ids.length,
            }
        })
        .filter(r => r.matchedCount > 0)

    // Новая сортировка:
    scored.sort((a, b) => {
        // 1) по totalIngredients (меньше → больше)
        if (a.totalIngredients !== b.totalIngredients) {
            return a.totalIngredients - b.totalIngredients
        }
        // 2) при равном totalIngredients – по matchedCount (больше → меньше)
        return b.matchedCount - a.matchedCount
    })

    return scored.slice(0, limit)
}

/**
 * Детальная информация по одному рецепту,
 * включая локализованные поля и ингредиенты с переводами.
 */
export async function getRecipeById(
    recipeId: number,
    language: string = 'en'
): Promise<RecipeDetail | null> {
    const rec = await prisma.recipe.findUnique({
        where: { id: recipeId },
        include: {
            translations: {
                where: { language },
                select: { title: true, description: true, steps: true },
            },
            ingredients: {
                include: {
                    product: {
                        include: {
                            translations: {
                                where: { language },
                                select: { name: true, emoji: true },
                            },
                        },
                    },
                },
            },
        },
    })
    if (!rec) return null

    const tr = rec.translations[0]
    const ingredients = rec.ingredients.map(item => {
        const prodTr = item.product.translations[0]
        return {
            productId: item.productId,
            name: prodTr?.name ?? item.productId,
            emoji: prodTr?.emoji ?? '',
        }
    })

    return {
        id: rec.id,
        title: tr?.title ?? `#${rec.id}`,
        description: tr?.description ?? null,
        steps: tr?.steps ?? null,
        ingredients,
    }
}

/**
 * Сохраняет рецепт в избранное пользователя.
 */
export async function saveFavoriteRecipe(
    telegramId: number,
    recipeId: number
): Promise<{ success: boolean; reason?: 'not_found' | 'already_exists' }> {
    const user = await prisma.user.findUnique({
        where: { telegramId },
        select: { id: true },
    })
    if (!user) return { success: false, reason: 'not_found' }

    try {
        await prisma.favoriteRecipe.create({
            data: { userId: user.id, recipeId },
        })
        return { success: true }
    } catch (err: any) {
        if (err.code === 'P2002') {
            return { success: false, reason: 'already_exists' }
        }
        throw err
    }
}

/**
 * Удаляет рецепт из избранного пользователя.
 */
export async function removeFavoriteRecipe(
    telegramId: number,
    recipeId: number
): Promise<{ success: boolean; reason?: 'not_found' }> {
    const user = await prisma.user.findUnique({
        where: { telegramId },
        select: { id: true },
    })
    if (!user) return { success: false, reason: 'not_found' }

    await prisma.favoriteRecipe.deleteMany({
        where: { userId: user.id, recipeId },
    })
    return { success: true }
}

/**
 * Возвращает все сохранённые рецепты пользователя,
 * с локализованными полями.
 */
export async function getUserFavoriteRecipes(
    telegramId: number,
    language: string = 'en'
): Promise<RecipeDetail[]> {
    const favs = await prisma.favoriteRecipe.findMany({
        where: { user: { telegramId } },
        include: {
            recipe: {
                include: {
                    translations: {
                        where: { language },
                        select: { title: true, description: true, steps: true },
                    },
                    ingredients: {
                        include: {
                            product: {
                                include: {
                                    translations: {
                                        where: { language },
                                        select: { name: true, emoji: true },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    })

    return favs.map(f => {
        const r = f.recipe
        const tr = r.translations[0]
        const ingredients = r.ingredients.map(item => {
            const prodTr = item.product.translations[0]
            return {
                productId: item.productId,
                name: prodTr?.name ?? item.productId,
                emoji: prodTr?.emoji ?? '',
            }
        })
        return {
            id: r.id,
            title: tr?.title ?? `#${r.id}`,
            description: tr?.description ?? null,
            steps: tr?.steps ?? null,
            ingredients,
        }
    })
}
