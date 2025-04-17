import { Bot } from 'grammy';
import { config } from 'dotenv';
import { startCommand } from './commands/start';
import { helpCommand } from './commands/help';
import {productsCommand} from "./commands/products";
import {addCommand} from "./commands/add";
import {removeCommand} from "./commands/remove";
import {recipesCommand} from "./commands/recipes";
import {deleteRecipeAction, saveRecipeAction, showRecipeAction} from "./commands/recipeActions";
import {favoritesCommand} from "./commands/favorites";
import {clearCommand} from "./commands/clear";

config(); // Загружаем .env

const bot = new Bot(process.env.BOT_TOKEN!);

bot.command('start', startCommand);
bot.command('help', helpCommand);
bot.command('products', productsCommand);
bot.command('add', addCommand);
bot.command('remove', removeCommand);
bot.command('recipes', recipesCommand);
bot.command('clear', clearCommand);

bot.callbackQuery(/^show_\d+$/, showRecipeAction);
bot.callbackQuery(/^save_\d+$/, saveRecipeAction);
bot.command('favorites', favoritesCommand);
bot.callbackQuery(/^delete_\d+$/, deleteRecipeAction);

// Запуск
bot.start();
console.log('🤖 Бот запущен!');
