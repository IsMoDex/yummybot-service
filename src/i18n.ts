// src/i18n.ts
import fs from 'fs'
import path from 'path'
import { MyContext } from './types'

type Messages = { [key: string]: string }
const locales: Record<string, Messages> = {}

export function loadLocales() {
    const dir = path.join(__dirname, 'locales')
    for (const file of fs.readdirSync(dir)) {
        if (file.endsWith('.json')) {
            const lang = file.replace(/\.json$/, '')
            locales[lang] = JSON.parse(
                fs.readFileSync(path.join(dir, file), 'utf-8')
            )
        }
    }
}

/**
 * t(ctx, key, vars?) — автоматически определяет язык из ctx.from.language_code
 */
export function t(
    ctx: MyContext,
    key: string,
    vars?: Record<string, string | number>
): string {
    const lang = ctx.from?.language_code || 'en'
    const msgs = locales[lang] || locales['en'] || {}
    let str = msgs[key] || msgs[key.replace(/\..+$/, '')] || key
    if (vars) {
        for (const [k, v] of Object.entries(vars)) {
            str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v))
        }
    }
    return str
}
