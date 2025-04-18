import { Keyboard } from 'grammy';

export const mainKeyboard = new Keyboard()
    .text('🍎 Продукты')
    .text('🧀 Любимые ингредиенты')
    .row()
    .text('🍲 Рецепты')
    .text('📖 Сохраненные рецепты')
    .resized();