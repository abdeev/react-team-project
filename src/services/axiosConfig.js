import axios from 'axios';

const request = axios.create({ baseURL: 'https://wallet.goit.ua' });

const setToken = {
    add(token) {
        request.defaults.headers.common.Authorization = `Bearer ${token}`;
    },
    remove() {
        request.defaults.headers.common.Authorization = '';
    }
}

export { request, setToken };