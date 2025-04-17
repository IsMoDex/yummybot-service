import { Bot } from 'grammy';
import { config } from 'dotenv';
import { startCommand } from './commands/start';
import { helpCommand } from './commands/help';
import {productsCommand} from "./commands/products";
import {addCommand} from "./commands/add";
import {removeCommand} from "./commands/remove";
import {recipesCommand} from "./commands/recipes";
import {saveRecipeAction, showRecipeAction} from "./commands/recipeActions";

config(); // Загружаем .env

const bot = new Bot(process.env.BOT_TOKEN!);

bot.command('start', startCommand);
bot.command('help', helpCommand);
bot.command('products', productsCommand);
bot.command('add', addCommand);
bot.command('remove', removeCommand);
bot.command('recipes', recipesCommand);

bot.callbackQuery(/^show_\d+$/, showRecipeAction);
bot.callbackQuery(/^save_\d+$/, saveRecipeAction);

// Запуск
bot.start();
console.log('🤖 Бот запущен!');
