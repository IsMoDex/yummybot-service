import { Bot } from 'grammy';
import { config } from 'dotenv';
import { startCommand } from './commands/start';
import { helpCommand } from './commands/help';
import {productsCommand} from "./commands/products";
import {addCommand} from "./commands/add";
import {removeCommand} from "./commands/remove";

config(); // Загружаем .env

const bot = new Bot(process.env.BOT_TOKEN!);

bot.command('start', startCommand);
bot.command('help', helpCommand);
bot.command('products', productsCommand);
bot.command('add', addCommand);
bot.command('remove', removeCommand);

// Запуск
bot.start();
console.log('🤖 Бот запущен!');
