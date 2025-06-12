import dotenv from "dotenv";
import assert from "assert";

// Загружаем переменные окружения из .env
dotenv.config();

// Обязательные переменные
assert(process.env.BOT_TOKEN, "❌ BOT_TOKEN is required in .env");
assert(process.env.DATABASE_URL, "❌ DATABASE_URL is required in .env");

export const config = {
    botToken: process.env.BOT_TOKEN as string,
    databaseUrl: process.env.DATABASE_URL as string,
    neuralApiUrl: process.env.NEURAL_API_URL as string,
    neuralApiKey: process.env.NEURAL_API_KEY ?? "", // необязательный ключ
};

export const PRODUCT_PAGE_SIZE = 5;
export const RECIPE_PAGE_SIZE = 5;