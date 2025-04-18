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

/**
 * Вход в prompt‑режим добавления
 */
export async function promptAddAction(ctx: MyContext) {
    await ctx.answerCallbackQuery()
    ctx.session.action = 'add'
    ctx.session.page = 0
    delete ctx.session.lastResults
    return ctx.reply('Введите название продукта для добавления:')
}

/**
 * Вход в prompt‑режим удаления
 */
export async function promptRemoveAction(ctx: MyContext) {
    await ctx.answerCallbackQuery()
    ctx.session.action = 'remove'
    ctx.session.page = 0
    delete ctx.session.lastResults
    return ctx.reply('Введите название продукта для удаления:')
}

/**
 * Обработка текста в prompt‑режиме
 */
export async function productPromptTextHandler(ctx: MyContext) {
    const action = ctx.session.action
    if (!action) return
    const text = ctx.message?.text?.trim()
    if (!text) return
    const lang = ctx.from?.language_code ?? 'ru'
    const telegramId = ctx.from!.id

    let user = await findUser(telegramId)
    if (!user) {
        user = await createUser(ctx)
        if (!user) {
            return ctx.reply('❌ Не удалось создать пользователя, выполните /start')
        }
    }

    // Попытка точного совпадения
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

        // Обновляем список /products
        if (ctx.session.lastProductsMessage) {
            await renderProductsAndKeyboard(ctx)
        }

        delete ctx.session.action
        delete ctx.session.lastResults
        delete ctx.session.page
        return
    }

    // Поиск похожих
    let similar = await searchTranslations(lang, text)
    const userIds = await getUserProductIds(telegramId)

    if (action === 'add') {
        similar = similar.filter((t) => !userIds.includes(t.productId))
        if (!similar.length) {
            return ctx.reply('✅ Все найденные продукты уже есть в вашем списке.')
        }
    } else {
        similar = similar.filter((t) => userIds.includes(t.productId))
        if (!similar.length) {
            return ctx.reply('❌ Нет похожих продуктов для удаления.')
        }
    }

    ctx.session.lastResults = similar
    ctx.session.page = 0
    return sendPage(ctx)
}

/**
 * Обработка пагинации
 */
export async function productPromptPageHandler(ctx: MyContext) {
    const data = ctx.callbackQuery?.data
    if (!data) return
    const [, action, pageStr] = data.split('_')
    ctx.session.action = action as 'add' | 'remove'
    ctx.session.page = parseInt(pageStr, 10)
    await ctx.answerCallbackQuery()
    return sendPage(ctx)
}

/**
 * Финальный обработчик add_<id> / remove_<id>
 */
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

    // Удаляем нажатый продукт из результатов
    removeFromLastResults(ctx, productId)
    // Обновляем inline‑клавиатуру похожих
    await updateSimilarKeyboard(ctx)

    // Обновляем /products
    if (ctx.session.lastProductsMessage) {
        await renderProductsAndKeyboard(ctx)
    }
}

/**
 * Удаляет productId из session.lastResults и корректирует страницу
 */
function removeFromLastResults(ctx: MyContext, productId: string) {
    if (!ctx.session.lastResults) return
    ctx.session.lastResults = ctx.session.lastResults.filter(
        (t) => t.productId !== productId
    )
    const total = ctx.session.lastResults.length
    const maxPage = Math.floor((total - 1) / PRODUCT_PAGE_SIZE)
    if ((ctx.session.page ?? 0) > maxPage) {
        ctx.session.page = maxPage
    }
}

/**
 * Обновляет inline‑клавиатуру похожих на месте
 */
async function updateSimilarKeyboard(ctx: MyContext) {
    const results = ctx.session.lastResults ?? []
    const page = ctx.session.page ?? 0
    const start = page * PRODUCT_PAGE_SIZE
    const slice = results.slice(start, start + PRODUCT_PAGE_SIZE)

    // Если список пуст — заменяем текст
    if (results.length === 0) {
        try {
            await ctx.editMessageText(
                '✅ Все предложенные продукты обработаны.',
                { reply_markup: undefined }
            )
        } catch (err: any) {
            if (
                !(err instanceof GrammyError &&
                    err.error_code === 400 &&
                    err.description?.includes('message is not modified'))
            ) {
                throw err
            }
        }
        return
    }

    const kb = new InlineKeyboard()
    slice.forEach((item) => {
        const label = `${item.emoji ?? ''} ${item.name}`
        kb.text(
            ctx.session.action === 'add' ? `➕ ${label}` : `➖ ${label}`,
            `${ctx.session.action}_${item.productId}`
        ).row()
    })

    if (page > 0) {
        kb.text('◀️ Назад', `page_${ctx.session.action}_${page - 1}`)
    }
    if (start + PRODUCT_PAGE_SIZE < results.length) {
        kb.text('Вперёд ▶️', `page_${ctx.session.action}_${page + 1}`)
    }

    try {
        await ctx.editMessageReplyMarkup({ reply_markup: kb })
    } catch (err: any) {
        if (
            !(err instanceof GrammyError &&
                err.error_code === 400 &&
                err.description?.includes('message is not modified'))
        ) {
            throw err
        }
    }
}

/**
 * Рендер и правка последнего списка /products
 */
async function renderProductsAndKeyboard(ctx: MyContext) {
    const { chat, message_id } = ctx.session.lastProductsMessage!
    const telegramId = ctx.from!.id
    const lang = ctx.from?.language_code || 'ru'

    const products = await getUserProducts(telegramId, lang)
    // Если пуст
    if (products.length === 0) {
        const kbEmpty = new InlineKeyboard().text('➕ Добавить', 'prompt_add')
        try {
            await ctx.api.editMessageText(
                chat,
                message_id,
                '⚠️ Вы удалили все продукты. Добавьте новые через "➕ Добавить".',
                { reply_markup: kbEmpty }
            )
        } catch (err: any) {
            if (
                !(err instanceof GrammyError &&
                    err.error_code === 400 &&
                    err.description?.includes('message is not modified'))
            ) {
                throw err
            }
        }
        return
    }

    const list = products
        .map((e, i) => `${i + 1}. ${e.emoji} ${e.name}`)
        .join('\n')

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
            !(err instanceof GrammyError &&
                err.error_code === 400 &&
                err.description?.includes('message is not modified'))
        ) {
            throw err
        }
    }
}

/**
 * Вывод порции похожих продуктов
 */
async function sendPage(ctx: MyContext) {
    const results = ctx.session.lastResults ?? []
    const page = ctx.session.page ?? 0
    const action = ctx.session.action!
    const start = page * PRODUCT_PAGE_SIZE
    const slice = results.slice(start, start + PRODUCT_PAGE_SIZE)

    const kb = new InlineKeyboard()
    slice.forEach((item) => {
        const label = `${item.emoji ?? ''} ${item.name}`
        kb.text(
            action === 'add' ? `➕ ${label}` : `➖ ${label}`,
            `${action}_${item.productId}`
        ).row()
    })

    if (page > 0) {
        kb.text('◀️ Назад', `page_${action}_${page - 1}`)
    }
    if (start + PRODUCT_PAGE_SIZE < results.length) {
        kb.text('Вперёд ▶️', `page_${action}_${page + 1}`)
    }

    await ctx.reply(
        `Похожие продукты (стр. ${page + 1}/${Math.ceil(results.length / PRODUCT_PAGE_SIZE)}):`,
        { reply_markup: kb }
    )
}
