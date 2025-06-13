// src/commands/productPromptActions.ts

import { MyContext } from '../types'
import { findUser, createUser } from '../database/queries/user'
import { saveInteraction } from '../database/queries/history'
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
import { t } from '../i18n'

/** 1) Вход в prompt‑режим “Добавить” */
export async function promptAddAction(ctx: MyContext) {
    await ctx.answerCallbackQuery()
    ctx.session.action = 'add'
    ctx.session.page = 0
    delete ctx.session.lastResults
    return ctx.reply(t(ctx, 'productPrompt.add.prompt'))
}

/** 2) Вход в prompt‑режим “Убрать” */
export async function promptRemoveAction(ctx: MyContext) {
    await ctx.answerCallbackQuery()
    ctx.session.action = 'remove'
    ctx.session.page = 0
    delete ctx.session.lastResults
    return ctx.reply(t(ctx, 'productPrompt.remove.prompt'))
}

/** 3) Обработка текста в prompt‑режиме */
export async function productPromptTextHandler(ctx: MyContext) {
    const action = ctx.session.action
    if (!action) return

    const text = ctx.message?.text?.trim()
    if (!text) return

    const from = ctx.from
    if (!from) return
    const lang = from.language_code || 'en'
    const telegramId = from.id

    // Убедимся, что user существует
    let user = await findUser(telegramId)
    if (!user) {
        user = await createUser(ctx)
        if (!user) {
            return ctx.reply(t(ctx, 'productPrompt.userCreateError'))
        }
    }

    // 3.1) Попытка точного совпадения
    const exact = await findExactTranslations(lang, text)
    if (exact.length === 1) {
        const { productId, name, emoji } = exact[0]
        const res =
            action === 'add'
                ? await addProductToUser(telegramId, productId)
                : await removeProductFromUser(telegramId, productId)

        if (res.success) {
            const key = action === 'add'
                ? 'productPrompt.add.success'
                : 'productPrompt.remove.success'
            await ctx.reply(t(ctx, key, { name, emoji: emoji || '' }))
        } else {
            const reasonKey = res.reason === 'already_exists'
                ? 'productPrompt.add.alreadyExists'
                : res.reason === 'not_in_list'
                    ? 'productPrompt.remove.notInList'
                    : 'productPrompt.notFound'
            await ctx.reply(t(ctx, reasonKey, { name }))
        }

        // Обновляем /products
        if (ctx.session.lastProductsMessage) {
            await renderProductsAndKeyboard(ctx)
        }

        delete ctx.session.action
        delete ctx.session.lastResults
        delete ctx.session.page
        return
    }

    // 3.2) Ищем похожие переводы
    let similar = await searchTranslations(lang, text)
    const userIds = await getUserProductIds(telegramId)

    if (action === 'add') {
        similar = similar.filter(t => !userIds.includes(t.productId))
        if (!similar.length) {
            return ctx.reply(t(ctx, 'productPrompt.add.none'))
        }
    } else {
        similar = similar.filter(t => userIds.includes(t.productId))
        if (!similar.length) {
            return ctx.reply(t(ctx, 'productPrompt.remove.none'))
        }
    }

    ctx.session.lastResults = similar
    ctx.session.page = 0
    return sendPage(ctx)
}

/** 4) Пагинация похожих */
export async function productPromptPageHandler(ctx: MyContext) {
    const data = ctx.callbackQuery?.data
    if (!data) return
    const [, action, pageStr] = data.split('_')
    ctx.session.action = action as 'add' | 'remove'
    ctx.session.page = parseInt(pageStr, 10)
    await ctx.answerCallbackQuery()
    return sendPage(ctx)
}

/** 5) Финальный add_<id> / remove_<id> */
export async function productPromptFinalHandler(ctx: MyContext) {
    const data = ctx.callbackQuery?.data
    if (!data) return
    const m = data.match(/^(add|remove)_(.+)$/)
    if (!m) return
    const action = m[1] as 'add' | 'remove'
    const productId = m[2]

    const from = ctx.from!
    const lang = from.language_code || 'en'
    const telegramId = from.id

    const tr = await getTranslationById(productId, lang)
    if (!tr) {
        return ctx.answerCallbackQuery({ text: t(ctx, 'productPrompt.notFound'), show_alert: true })
    }

    const res = action === 'add'
        ? await addProductToUser(telegramId, productId)
        : await removeProductFromUser(telegramId, productId)

    if (res.success) {
        // — здесь логируем действие
        const histType = action === 'add' ? 'add_product' : 'remove_product'
        await saveInteraction(telegramId, histType, { productId, name: tr.name })

        const key = action === 'add'
            ? 'productPrompt.add.success'
            : 'productPrompt.remove.success'
        await ctx.answerCallbackQuery({
            text: t(ctx, key, { name: tr.name, emoji: tr.emoji ?? '' })
        })

        removeFromLastResults(ctx, productId)
        await updateSimilarKeyboard(ctx)
        if (ctx.session.lastProductsMessage) {
            await renderProductsAndKeyboard(ctx)
        }
    } else {
        const reasonKey = res.reason === 'already_exists'
            ? 'productPrompt.add.alreadyExists'
            : res.reason === 'not_in_list'
                ? 'productPrompt.remove.notInList'
                : 'productPrompt.notFound'
        await ctx.answerCallbackQuery({
            text: t(ctx, reasonKey, { name: tr.name }),
            show_alert: res.reason !== 'already_exists' && res.reason !== 'not_in_list',
        })
    }
}

// — Вспомогательные функции — //

function removeFromLastResults(ctx: MyContext, productId: string) {
    if (!ctx.session.lastResults) return
    ctx.session.lastResults = ctx.session.lastResults.filter(
        t => t.productId !== productId
    )
    const total = ctx.session.lastResults.length
    const maxPage = Math.floor((total - 1) / PRODUCT_PAGE_SIZE)
    if ((ctx.session.page ?? 0) > maxPage) {
        ctx.session.page = maxPage
    }
}

async function updateSimilarKeyboard(ctx: MyContext) {
    const results = ctx.session.lastResults || []
    const page = ctx.session.page!
    const start = page * PRODUCT_PAGE_SIZE
    const slice = results.slice(start, start + PRODUCT_PAGE_SIZE)

    if (!slice.length) {
        return ctx.editMessageText(t(ctx, 'productPrompt.similar.empty'))
    }

    const kb = new InlineKeyboard()
    slice.forEach(item => {
        const label = `${item.emoji || ''} ${item.name}`
        const btnKey = ctx.session.action === 'add'
            ? 'productPrompt.similar.addButton'
            : 'productPrompt.similar.removeButton'
        kb.text(t(ctx, btnKey, { label }), `${ctx.session.action}_${item.productId}`).row()
    })

    if (page > 0) {
        kb.text(
            t(ctx, 'productPrompt.pagination.prev'),
            `page_${ctx.session.action}_${page - 1}`
        )
    }
    if (start + PRODUCT_PAGE_SIZE < results.length) {
        kb.text(
            t(ctx, 'productPrompt.pagination.next'),
            `page_${ctx.session.action}_${page + 1}`
        )
    }

    try {
        await ctx.editMessageReplyMarkup({ reply_markup: kb })
    } catch (err: any) {
        if (!(err instanceof GrammyError && err.error_code === 400)) throw err
    }
}

async function renderProductsAndKeyboard(ctx: MyContext) {
    const { chat, message_id } = ctx.session.lastProductsMessage!
    const from = ctx.from!
    const lang = from.language_code || 'en'

    const products = await getUserProducts(from.id, lang)
    if (!products.length) {
        const kbEmpty = new InlineKeyboard()
            .text(t(ctx, 'productPrompt.add.button'), 'prompt_add')
        return ctx.api.editMessageText(
            chat,
            message_id,
            t(ctx, 'productPrompt.list.empty'),
            { reply_markup: kbEmpty }
        )
    }

    const list = products
        .map((p, i) => `${i + 1}. ${p.emoji} ${p.name}`)
        .join('\n')
    const kb = new InlineKeyboard()
        .text(t(ctx, 'productPrompt.add.button'), 'prompt_add')
        .text(t(ctx, 'productPrompt.remove.button'), 'prompt_remove')

    await ctx.api.editMessageText(
        chat,
        message_id,
        `${t(ctx, 'productPrompt.list.header')}\n\n${list}`,
        { parse_mode: 'Markdown', reply_markup: kb }
    )
}

async function sendPage(ctx: MyContext) {
    const results = ctx.session.lastResults || []
    const page = ctx.session.page!
    const start = page * PRODUCT_PAGE_SIZE
    const slice = results.slice(start, start + PRODUCT_PAGE_SIZE)

    const kb = new InlineKeyboard()
    slice.forEach(item => {
        const label = `${item.emoji || ''} ${item.name}`
        const btnKey = ctx.session.action === 'add'
            ? 'productPrompt.similar.addButton'
            : 'productPrompt.similar.removeButton'
        kb.text(t(ctx, btnKey, { label }), `${ctx.session.action}_${item.productId}`).row()
    })

    if (page > 0) {
        kb.text(
            t(ctx, 'productPrompt.pagination.prev'),
            `page_${ctx.session.action}_${page - 1}`
        )
    }
    if (start + PRODUCT_PAGE_SIZE < results.length) {
        kb.text(
            t(ctx, 'productPrompt.pagination.next'),
            `page_${ctx.session.action}_${page + 1}`
        )
    }

    await ctx.reply(
        t(ctx, 'productPrompt.similar.header', {
            page: page + 1,
            total: Math.ceil(results.length / PRODUCT_PAGE_SIZE),
        }),
        { reply_markup: kb }
    )
}
