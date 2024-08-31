import axios, {AxiosHeaders, InternalAxiosRequestConfig} from 'axios';
import {getToken} from './token';

const baseURL = 'http://192.168.0.19:5001/api';
export const socketURL = 'http://192.168.0.19:5001';

//https://backed-nestjs-base-1.onrender.com'

/* const baseURL = STRING.backendUrl; */

const api = axios.create({baseURL});

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const token = await getToken();

  console.log('token', token);

  if (token) {
    if (config.headers instanceof AxiosHeaders) {
      config.headers.set('access-control-allow-origin', '*');
      config.headers.set('content-type', 'application/json');
      config.headers.set('x-token', token);
    } else {
      config.headers = new AxiosHeaders({
        'access-control-allow-origin': '*',
        'content-type': 'application/json',
        'x-token': token,
      });
    }
  }

  return config;
});

export default api;
