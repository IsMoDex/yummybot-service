import { Keyboard } from 'grammy';

export const mainKeyboard = new Keyboard()
    .text('🍎 Продукты')
    .text('🍲 Рецепты')
    .row()
    .text('📖 Сохраненные рецепты')
    .resized();