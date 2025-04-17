import { Bot, Context } from 'grammy';
import { config } from 'dotenv';

import { startCommand }    from './commands/start';
import { helpCommand }     from './commands/help';
import { productsCommand } from './commands/products';
import { addCommand }      from './commands/add';
import { removeCommand }   from './commands/remove';
import { clearCommand }    from './commands/clear';
import { uploadCommand }   from './commands/upload';
import { recipesCommand }  from './commands/recipes';
import { favoritesCommand }from './commands/favorites';
import { showRecipeAction, saveRecipeAction, deleteRecipeAction } from './commands/recipeActions';

config();
const bot = new Bot<Context>(process.env.BOT_TOKEN!);

// команды
bot.command('start',    startCommand);
bot.command('help',     helpCommand);
bot.command('products', productsCommand);
bot.command('add',      addCommand);
bot.command('remove',   removeCommand);
bot.command('clear',    clearCommand);
bot.command('upload',   async ctx => { await ctx.reply('❗ Пожалуйста, отправьте фотографию содержимого холодильника.'); });
bot.on('message:photo', uploadCommand);
bot.command('recipes',  recipesCommand);
bot.command('favorites',favoritesCommand);

// inline‑действия
bot.callbackQuery(/^show_\d+$/,   showRecipeAction);
bot.callbackQuery(/^save_\d+$/,   saveRecipeAction);
bot.callbackQuery(/^delete_\d+$/, deleteRecipeAction);

// глобальный обработчик ошибок
bot.catch(async errCtx => {
    console.error('Bot error:', errCtx.error);
    try {
        await errCtx.ctx.reply('🚨 Что‑то пошло не так. Попробуйте ещё раз.');
    } catch {}
});

bot.start();
console.log('🤖 Бот запущен!');
