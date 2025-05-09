// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import {runProductsAndTranslations} from "./seeds/01-products-and-translations";
import {runRecipes} from "./seeds/02-recipes";

const prisma = new PrismaClient()

async function main() {
    // 1) Создаём продукты и их переводы (en/ru + emoji)
    await runProductsAndTranslations(prisma)

    // 2) Генерируем 500 рецептов с переводами и ингредиентами
    await runRecipes(prisma)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
