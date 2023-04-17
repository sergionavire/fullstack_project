import axios from 'axios';

export const apiNotePad = axios.create({
    baseURL: 'https://webservices.jumpingcrab.com',
})