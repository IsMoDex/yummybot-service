import { Context } from 'grammy';

export async function helpCommand(ctx: Context) {
    await ctx.reply(`
📖 *Доступные команды:*

/start — регистрация и приветствие
/help — справка по всем командам
/products — список ваших добавленных продуктов
/add <product_id> — добавить продукт по его machine‑ID (например apple)
/remove <product_id> — удалить продукт из списка
/clear — очистить весь список продуктов
/upload — загрузить фото холодильника для распознавания продуктов
/recipes — получить подборку рецептов по вашим продуктам и любимым ингредиентам
/favorites — показать сохранённые в избранное рецепты  
/menu — показать главное меню с кнопками
  `, {
        parse_mode: 'Markdown'
    });
}
