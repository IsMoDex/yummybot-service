// src/types.ts

import { Context, SessionFlavor } from 'grammy'
import {
    RecipeRecommendation,
    RecipeDetail,
} from './database/queries/recipe'

export interface MySession {
    // prompt‑режим для add/remove продуктов
    action?: 'add' | 'remove'
    page?: number
    lastResults?: Array<{
        productId: string
        name: string
        emoji: string | null
    }>

    // для редактирования списка /products
    lastProductsMessage?: {
        chat: number
        message_id: number
    }

    // для пагинации рекомендаций (/recipes)
    recs?: RecipeRecommendation[]
    recipePage?: number
    lastRecipesMessage?: {
        chat: number
        message_id: number
    }

    // для пагинации избранного (/favorites)
    favs?: RecipeDetail[]
    favoritePage?: number
    lastFavoritesMessage?: {
        chat: number
        message_id: number
    }

    lastRecipeMessageIds?: Array<{ chat: number; message_id: number }>
    lastRecipesNavMessageId?: { chat: number; message_id: number }

    lastFavoriteMessageIds?: Array<{ chat: number; message_id: number }>
    lastFavoritesNavMessageId?: { chat: number; message_id: number }

}

export type MyContext = Context & SessionFlavor<MySession>
