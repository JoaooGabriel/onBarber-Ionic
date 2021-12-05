import axios from 'axios';
import { environment } from 'src/environments/environment.prod';

export const api = axios.create({
    baseURL: environment.production ? environment.backendApiBaseURL : '',
    headers: {
        'Content-Type': 'application/json',
        accept: 'application/json, text/plain'
    }
});