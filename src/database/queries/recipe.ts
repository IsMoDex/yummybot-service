// src/database/queries/recipe.ts

import prisma from '../client';

export interface RecipeRecommendation {
    id: number;
    title: string;
    description: string | null;
    steps: string;
    matchedCount: number;
    totalIngredients: number;
    favProductMatches: number;
}

/**
 * Возвращает список рекомендаций по рецептам:
 *  - сначала – рецепты, полностью собранные из имеющихся продуктов;
 *  - далее – частичные, отсортированные по количеству недостающих ингредиентов;
 *  - внутри групп – приоритет по количеству любимых продуктов пользователя.
 */
export async function getRecipeRecommendations(
    telegramId: number,
    limit = 5
): Promise<RecipeRecommendation[]> {
    const user = await prisma.user.findUnique({
        where: { telegramId },
        select: { id: true },
    });
    if (!user) return [];

    // Все продукты пользователя
    const userProds = await prisma.userProduct.findMany({
        where: { userId: user.id },
        select: { productId: true },
    });

    // Любимые продукты пользователя
    const favProds = await prisma.favoriteProduct.findMany({
        where: { userId: user.id },
        select: { productId: true },
    });

    const userIds = new Set(userProds.map(p => p.productId));
    const favIds  = new Set(favProds.map(p => p.productId));

    // Загружаем все рецепты вместе с ингредиентами
    const recipes = await prisma.recipe.findMany({
        include: { ingredients: true },
    });

    // Считаем по каждому рецепту количество совпадений
    const scored = recipes
        .map(r => {
            const ids = r.ingredients.map(i => i.productId);
            const matchedCount      = ids.filter(id => userIds.has(id)).length;
            const favProductMatches = ids.filter(id => favIds.has(id)).length;
            return {
                id: r.id,
                title: r.title,
                description: r.description,
                steps: r.steps,
                matchedCount,
                totalIngredients: ids.length,
                favProductMatches,
            };
        })
        .filter(r => r.matchedCount > 0);

    // Сортируем: полные → минимальные пропуски → по любимым
    scored.sort((a, b) => {
        const aMiss = a.totalIngredients - a.matchedCount;
        const bMiss = b.totalIngredients - b.matchedCount;
        if (aMiss === 0 && bMiss !== 0) return -1;
        if (bMiss === 0 && aMiss !== 0) return 1;
        if (aMiss !== bMiss) return aMiss - bMiss;
        return b.favProductMatches - a.favProductMatches;
    });

    return scored.slice(0, limit);
}

export interface RecipeDetail {
    id: number;
    title: string;
    description: string | null;
    steps: string;
    ingredients: { productId: string; name: string; emoji: string }[];
}

/**
 * Возвращает детальную информацию по одному рецепту:
 *  - сам рецепт,
 *  - список ингредиентов с переводами и эмодзи на нужном языке.
 */
export async function getRecipeById(
    recipeId: number,
    language: string = 'ru'
): Promise<RecipeDetail | null> {
    const recipe = await prisma.recipe.findUnique({
        where: { id: recipeId },
        include: {
            ingredients: {
                include: {
                    product: {
                        include: { translations: true },
                    },
                },
            },
        },
    });
    if (!recipe) return null;

    const ingredients = recipe.ingredients.map(item => {
        const tr = item.product.translations.find(t => t.language === language);
        return {
            productId: item.productId,
            name: tr?.name ?? item.productId,
            emoji: tr?.emoji ?? '',
        };
    });

    return {
        id: recipe.id,
        title: recipe.title,
        description: recipe.description,
        steps: recipe.steps,
        ingredients,
    };
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
    });
    if (!user) return { success: false, reason: 'not_found' };

    try {
        await prisma.favoriteRecipe.create({
            data: { userId: user.id, recipeId },
        });
        return { success: true };
    } catch (err: any) {
        if (err.code === 'P2002') {
            return { success: false, reason: 'already_exists' };
        }
        throw err;
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
    });
    if (!user) return { success: false, reason: 'not_found' };

    await prisma.favoriteRecipe.deleteMany({
        where: { userId: user.id, recipeId },
    });
    return { success: true };
}

/**
 * Возвращает все сохранённые в избранное рецепты пользователя.
 */
export async function getUserFavoriteRecipes(
    telegramId: number,
    language: string = 'ru'
): Promise<RecipeDetail[]> {
    const favs = await prisma.favoriteRecipe.findMany({
        where: { user: { telegramId } },
        include: {
            recipe: {
                include: {
                    ingredients: {
                        include: {
                            product: { include: { translations: true } },
                        },
                    },
                },
            },
        },
    });

    return favs.map(f => {
        const r = f.recipe;
        const ingredients = r.ingredients.map(item => {
            const tr = item.product.translations.find(t => t.language === language);
            return {
                productId: item.productId,
                name: tr?.name ?? item.productId,
                emoji: tr?.emoji ?? '',
            };
        });
        return {
            id: r.id,
            title: r.title,
            description: r.description,
            steps: r.steps,
            ingredients,
        };
    });
}
