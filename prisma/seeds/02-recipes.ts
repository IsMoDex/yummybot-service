// prisma/seeds/02-recipes.ts

import { PrismaClient } from '@prisma/client'

export async function runRecipes(prisma: PrismaClient) {
    // 1) Список всех продуктов из БД
    const products = await prisma.product.findMany({ select: { id: true } })
    const allProductIds = products.map(p => p.id)

    // 2) Основные массивы для генерации названий
    const adjectivesEn    = ['Fresh','Spicy','Creamy','Tangy','Hearty','Zesty','Grilled','Roasted','Baked','Sautéed']
    const adjectivesRu    = ['Свежий','Острый','Кремовый','Пикантный','Сытный','Ароматный','Жареный','Запечённый','Печёный','Обжаренный']
    const mainIds         = ['tomato','chicken','cheese','beef','mushroom','potato','shrimp','spaghetti','strawberry','broccoli']
    const mainEn          = ['Tomato','Chicken','Cheese','Beef','Mushroom','Potato','Shrimp','Spaghetti','Strawberry','Broccoli']
    const mainRu          = ['Помидор','Курица','Сыр','Говядина','Гриб','Картофель','Креветка','Спагетти','Клубника','Брокколи']
    const typesEn         = ['Salad','Soup','Casserole','Stew','Stir Fry','Pasta','Sandwich','Wrap','Gratin','Pizza']
    const typesRu         = ['салат','суп','запеканка','рагу','жаркое','паста','сэндвич','ролл','гратен','пицца']

    // 3) Генерируем 300 рецептов
    for (let i = 0; i < 300; i++) {
        // a) Создаём запись Recipe
        const recipe = await prisma.recipe.create({ data: {} })

        // b) Выбираем индексы для компонентов названия
        const adjIdx  = i % adjectivesEn.length
        const mainIdx = i % mainIds.length
        const typeIdx = i % typesEn.length

        const titleEn = `${adjectivesEn[adjIdx]} ${mainEn[mainIdx]} ${typesEn[typeIdx]}`
        const titleRu = `${adjectivesRu[adjIdx]} ${mainRu[mainIdx]} ${typesRu[typeIdx]}`

        // c) Описания
        const descriptionEn = `A delightful ${titleEn.toLowerCase()} made with fresh ingredients.`
        const descriptionRu = `Восхитительный ${titleRu.toLowerCase()}, приготовленный из свежих ингредиентов.`

        // d) Шаги (3–6 шагов)
        const stepCount = 3 + (i % 4)
        const ingredientsForSteps = allProductIds.slice(i, i + stepCount)
        const stepsEn = ingredientsForSteps
            .map(id => `- Prepare and add ${id.split(/[_ ]+/).map(w=>w[0].toUpperCase()+w.slice(1)).join(' ')}.`)
            .join('\n')
        const stepsRu = ingredientsForSteps
            .map(id => {
                // Простейший fallback: взять последнее слово из id и Title Case
                const ruName = mainRu[mainIds.indexOf(id)] || id
                    .split(/[_ ]+/)
                    .map(w => w[0].toUpperCase() + w.slice(1))
                    .join(' ')
                return `- Подготовьте и добавьте ${ruName}.`
            })
            .join('\n')

        // e) Вставляем переводы
        await prisma.recipeTranslation.createMany({
            data: [
                {
                    recipeId:   recipe.id,
                    language:   'en',
                    title:      titleEn,
                    description: descriptionEn,
                    steps:       stepsEn,
                },
                {
                    recipeId:   recipe.id,
                    language:   'ru',
                    title:      titleRu,
                    description: descriptionRu,
                    steps:       stepsRu,
                }
            ]
        })

        // f) Выбираем 3–7 ингредиентов по кругу из allProductIds
        const ingCount = 3 + (i % 5)
        const chosen = Array.from({ length: ingCount }, (_, j) =>
            allProductIds[(i * ingCount + j) % allProductIds.length]
        )

        // g) Записываем связи RecipeProduct
        await prisma.recipeProduct.createMany({
            data: chosen.map(productId => ({
                recipeId:   recipe.id,
                productId,
            }))
        })
    }
}
