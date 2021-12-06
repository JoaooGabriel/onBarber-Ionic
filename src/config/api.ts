import axios from 'axios';
import { environment } from 'src/environments/environment';

export const api = axios.create({
    baseURL: environment.backendApiBaseURL,
    headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
        accept: 'application/json, text/plain'
    }
});
