import axios from 'axios';

export const userApi = axios.create({
  baseURL: 'https://',
});

export const token = {
  set(token) {
    userApi.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    userApi.defaults.headers.common.Authorization = '';
  },
};
