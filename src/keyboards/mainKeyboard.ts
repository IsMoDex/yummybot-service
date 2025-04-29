// src/keyboards/mainKeyboard.ts

import { MyContext } from '../types'
import { Keyboard } from 'grammy'
import { t } from '../i18n'

export function mainKeyboard(ctx: MyContext) {
    return new Keyboard()
        .text(t(ctx, 'keyboard.products'))
        .text(t(ctx, 'keyboard.recipes'))
        .row()
        .text(t(ctx, 'keyboard.favorites'))
        .resized()
}
