export interface CacheEntry {
    ts: number;       // метка времени в ms
    list: string[];   // список распознанных productId
}

// TTL = 15 минут
export const CACHE_TTL = 15 * 60 * 1000;

// Кеш: key — message_id бота, value — список + время
export const recognizedCache = new Map<number, CacheEntry>();
