// src/commands/productPromptActions.ts

import { MyContext } from '../types'
import { findUser, createUser } from '../database/queries/user'
import {
    addProductToUser,
    removeProductFromUser,
    getUserProductIds,
    getUserProducts,
} from '../database/queries/product'
import {
    findExactTranslations,
    searchTranslations,
    getTranslationById,
} from '../database/queries/productTranslation'
import { InlineKeyboard, GrammyError } from 'grammy'
import { PRODUCT_PAGE_SIZE } from '../config'

/** 1) Входим в режим “Добавить” */
export async function promptAddAction(ctx: MyContext) {
    await ctx.answerCallbackQuery()
    ctx.session.action = 'add'
    ctx.session.page = 0
    delete ctx.session.lastResults
    return ctx.reply('Введите название продукта для добавления:')
}

/** 2) Входим в режим “Убрать” */
export async function promptRemoveAction(ctx: MyContext) {
    await ctx.answerCallbackQuery()
    ctx.session.action = 'remove'
    ctx.session.page = 0
    delete ctx.session.lastResults
    return ctx.reply('Введите название продукта для удаления:')
}

/** 3) Обработка текста в режиме prompt */
export async function productPromptTextHandler(ctx: MyContext) {
    const action = ctx.session.action
    if (!action) return
    const text = ctx.message?.text?.trim()
    if (!text) return
    const lang = ctx.from?.language_code ?? 'ru'
    const telegramId = ctx.from!.id

    // Убедимся, что пользователь в БД
    let userRec = await findUser(telegramId)
    if (!userRec) {
        userRec = await createUser(ctx)
        if (!userRec) {
            return ctx.reply('❌ Не удалось создать пользователя, выполните /start')
        }
    }

    // 3.1) Точное совпадение
    const exact = await findExactTranslations(lang, text)
    if (exact.length === 1) {
        const { productId, name, emoji } = exact[0]
        if (action === 'add') {
            const res = await addProductToUser(telegramId, productId)
            if (res.success) {
                await ctx.reply(`✅ Добавлен ${emoji ?? ''} ${name}`)
            } else if (res.reason === 'already_exists') {
                await ctx.reply('ℹ️ Этот продукт уже в вашем списке')
            } else {
                await ctx.reply('❌ Продукт не найден в справочнике')
            }
        } else {
            const res = await removeProductFromUser(telegramId, productId)
            if (res.success) {
                await ctx.reply(`🗑️ Удалён ${emoji ?? ''} ${name}`)
            } else if (res.reason === 'not_in_list') {
                await ctx.reply('ℹ️ Этого продукта нет в вашем списке')
            } else {
                await ctx.reply('❌ Продукт не найден в справочнике')
            }
        }

        // Обновляем последний список /products
        if (ctx.session.lastProductsMessage) {
            await renderProductsAndKeyboard(ctx)
        }
        delete ctx.session.action
        delete ctx.session.lastResults
        delete ctx.session.page
        return
    }

    // 3.2) Поиск похожих по подстроке
    let similar = await searchTranslations(lang, text)

    if (action === 'add') {
        // для add — показываем только те, которых нет в списке
        const userIds = await getUserProductIds(telegramId)
        similar = similar.filter((t) => !userIds.includes(t.productId))
        if (!similar.length) {
            return ctx.reply('✅ Все найденные продукты уже есть в вашем списке.')
        }
    }

    if (action === 'remove') {
        // для remove — только те, что уже есть
        const userIds = await getUserProductIds(telegramId)
        similar = similar.filter((t) => userIds.includes(t.productId))
        if (!similar.length) {
            return ctx.reply('❌ Нет похожих продуктов для удаления')
        }
    }

    if (!similar.length) {
        return ctx.reply('❌ Ничего не найдено. Попробуйте другое название.')
    }

    ctx.session.lastResults = similar
    ctx.session.page = 0
    return sendPage(ctx)
}

/** 4) Обработка пагинации */
export async function productPromptPageHandler(ctx: MyContext) {
    const data = ctx.callbackQuery?.data
    if (!data) return
    const [, action, pageStr] = data.split('_')
    ctx.session.action = action as 'add' | 'remove'
    ctx.session.page = parseInt(pageStr, 10)
    await ctx.answerCallbackQuery()
    return sendPage(ctx)
}

/** 5) Финальный обработчик add_<id> / remove_<id> */
export async function productPromptFinalHandler(ctx: MyContext) {
    const data = ctx.callbackQuery?.data
    if (!data) return
    const m = data.match(/^(add|remove)_(.+)$/)
    if (!m) return
    const action = m[1] as 'add' | 'remove'
    const productId = m[2]
    const lang = ctx.from?.language_code ?? 'ru'
    const telegramId = ctx.from!.id

    const tr = await getTranslationById(productId, lang)
    if (!tr) {
        await ctx.answerCallbackQuery({ text: '❌ Продукт не найден.' })
        return
    }

    if (action === 'add') {
        const res = await addProductToUser(telegramId, productId)
        if (res.success) {
            await ctx.answerCallbackQuery({ text: `✅ Добавлен ${tr.emoji ?? ''} ${tr.name}` })
        } else if (res.reason === 'already_exists') {
            await ctx.answerCallbackQuery({ text: 'ℹ️ Уже в списке.' })
        } else {
            await ctx.answerCallbackQuery({ text: '❌ Не найден в справочнике.' })
        }
    } else {
        const res = await removeProductFromUser(telegramId, productId)
        if (res.success) {
            await ctx.answerCallbackQuery({ text: `🗑️ Удалён ${tr.emoji ?? ''} ${tr.name}` })
        } else if (res.reason === 'not_in_list') {
            await ctx.answerCallbackQuery({ text: 'ℹ️ Не в вашем списке.' })
        } else {
            await ctx.answerCallbackQuery({ text: '❌ Не найден в справочнике.' })
        }
    }

    // Обновляем /products
    if (ctx.session.lastProductsMessage) {
        await renderProductsAndKeyboard(ctx)
    }

    delete ctx.session.action
    delete ctx.session.lastResults
    delete ctx.session.page
}

/** Рендер и правка последнего списка /products */
async function renderProductsAndKeyboard(ctx: MyContext) {
    const { chat, message_id } = ctx.session.lastProductsMessage!
    const telegramId = ctx.from!.id
    const lang = ctx.from?.language_code || 'ru'

    const products = await getUserProducts(telegramId, lang)
    const list = products
        .map((e, i) => `${i + 1}. ${e.emoji} ${e.name}`)
        .join('\n') || '— пусто —'

    const kb = new InlineKeyboard()
        .text('➕ Добавить', 'prompt_add')
        .text('➖ Убрать',   'prompt_remove')

    try {
        await ctx.api.editMessageText(
            chat,
            message_id,
            `*Ваши продукты:*\n\n${list}`,
            { parse_mode: 'Markdown', reply_markup: kb }
        )
    } catch (err: any) {
        if (
            err instanceof GrammyError &&
            err.error_code === 400 &&
            err.description?.includes('message is not modified')
        ) {
            return
        }
        throw err
    }
}

/** Вывод порции похожих продуктов */
async function sendPage(ctx: MyContext) {
    const results = ctx.session.lastResults ?? []
    const page = ctx.session.page ?? 0
    const action = ctx.session.action!
    const start = page * PRODUCT_PAGE_SIZE
    const end = start + PRODUCT_PAGE_SIZE
    const slice = results.slice(start, end)

    const kb = new InlineKeyboard()
    slice.forEach((item) => {
        const label = `${item.emoji ?? ''} ${item.name}`
        kb
            .text(
                action === 'add' ? `➕ ${label}` : `➖ ${label}`,
                `${action}_${item.productId}`
            )
            .row()
    })

    if (page > 0) {
        kb.text('◀️ Назад', `page_${action}_${page - 1}`)
    }
    if (end < results.length) {
        kb.text('Вперёд ▶️', `page_${action}_${page + 1}`)
    }

    await ctx.reply(
        `Похожие продукты (стр. ${page + 1}/${Math.ceil(results.length / PRODUCT_PAGE_SIZE)}):`,
        { reply_markup: kb }
    )
}
