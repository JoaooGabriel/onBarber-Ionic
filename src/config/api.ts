import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.BACKEND_API_BASE_URL,
    headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
        accept: 'application/json, text/plain'
    }
});
