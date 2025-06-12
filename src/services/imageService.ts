// src/services/imageService.ts

import axios from 'axios'
import FormData from 'form-data'

export async function recognizeProducts(buffer: Buffer) {
    // теперь обращаемся по хосту, где реально доступен FastAPI
    const url = process.env.FRIDGE_DETECTOR_URL ?? 'http://localhost:8000/detect'

    // собираем multipart/form-data
    const form = new FormData()
    form.append('file', buffer, {
        filename: 'photo.jpg',
        contentType: 'image/jpeg',
    })

    // для крупных изображений нужно снять лимиты по размеру тела запроса
    const resp = await axios.post<string[]>(url, form, {
        headers: {
            ...form.getHeaders(),
        },
        timeout: 60_000,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
    })

    // приводим к общему виду: { class, confidence }
    return resp.data.map(id => ({ class: id, confidence: 1 }))
}
