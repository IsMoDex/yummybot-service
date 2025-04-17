import axios from 'axios';

const MODEL_URL = process.env.ROBOFLOW_MODEL_URL!;
const API_KEY   = process.env.ROBOFLOW_API_KEY!;

export interface RecognitionResult {
    class: string;
    confidence: number;
}

export async function recognizeProducts(buffer: Buffer): Promise<RecognitionResult[]> {
    const base64 = buffer.toString('base64');
    const resp = await axios.post(
        MODEL_URL,
        base64,
        {
            params: { api_key: API_KEY },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            timeout: 60_000,       // ⏱ таймаут 60 секунд
        }
    );
    return resp.data.predictions as RecognitionResult[];
}
