// src/bot.ts

import { Bot } from 'grammy';
import { sessionMiddleware } from './middleware/session';
import { MyContext } from './types';

// — команды —
import { startCommand }    from './commands/start';
import { helpCommand }     from './commands/help';
import { productsCommand } from './commands/products';
import { addCommand }      from './commands/add';
import { removeCommand }   from './commands/remove';
import { clearCommand }    from './commands/clear';
import { uploadCommand }   from './commands/upload';
import {recipesCommand, recipesPageHandler} from './commands/recipes';
import {favoritesCommand, favoritesPageHandler} from './commands/favorites';
import menu from "./commands/menu";

// — inline из recipeActions и uploadActions —
import {
    showRecipeAction,
    saveRecipeAction,
    deleteRecipeAction,
} from './commands/recipeActions';
import {
    applyAddAction,
    applyReplaceAction,
} from './commands/uploadActions';

// — prompt‑режим для add/remove продуктов —
import {
    promptAddAction,
    promptRemoveAction,
    productPromptTextHandler,
    productPromptPageHandler,
    productPromptFinalHandler,
} from './commands/productPromptActions';

const bot = new Bot<MyContext>(process.env.BOT_TOKEN!);

// Подключаем сессию _до_ всех хендлеров
bot.use(sessionMiddleware);

// === Регистрация команд ===
bot.command('start',     startCommand);
bot.command('help',      helpCommand);
bot.command('products',  productsCommand);
bot.command('add',       addCommand);
bot.command('remove',    removeCommand);
bot.command('clear',     clearCommand);
bot.command('upload',    async ctx => {
    await ctx.reply('❗ Пожалуйста, отправьте фотографию содержимого холодильника.');
});
bot.on('message:photo',  uploadCommand);
bot.command('recipes',   recipesCommand);
bot.command('favorites', favoritesCommand);
bot.command('menu', menu);

// === Обработка кнопок клавиатуры ===
bot.hears('🍎 Продукты', productsCommand);
bot.hears('🍲 Рецепты', recipesCommand);
bot.hears('📖 Сохраненные рецепты', favoritesCommand);

// === Inline‑действия для рецептов и загрузки ===
bot.callbackQuery(/^show_\d+$/,   showRecipeAction);
bot.callbackQuery(/^save_\d+$/,   saveRecipeAction);
bot.callbackQuery(/^delete_\d+$/, deleteRecipeAction);
bot.callbackQuery('apply_add',     applyAddAction);
bot.callbackQuery('apply_replace', applyReplaceAction);
bot.callbackQuery(/^recipes_page_\d+$/, recipesPageHandler)
bot.callbackQuery(/^favorites_page_\d+$/, favoritesPageHandler)

// === Prompt‑режим для add/remove продуктов ===
bot.callbackQuery('prompt_add',    promptAddAction);
bot.callbackQuery('prompt_remove', promptRemoveAction);
bot.on('message:text',             productPromptTextHandler);
bot.callbackQuery(/^page_(add|remove)_(\d+)$/, productPromptPageHandler);
bot.callbackQuery(/^(add|remove)_.+$/,        productPromptFinalHandler);

// === Глобальный catch ===
bot.catch(async errCtx => {
    console.error('Bot error:', errCtx.error);
    try {
        await errCtx.ctx.reply('🚨 Что‑то пошло не так. Попробуйте ещё раз.');
    } catch {}
});

// === Запуск бота ===
bot.start();
console.log('🤖 Бот запущен!');
