import type {
  TFailureResponse,
  TSuccessResponse,
} from '@/models/types/auth.type';

import { useLocalStorage } from '@vueuse/core';
import axios, {
  type AxiosError,
  type AxiosResponse,
  HttpStatusCode,
} from 'axios';
import qs from 'qs';

const { ACCESS_TOKEN } = constants.shared.STORAGE_KEYS;

const httpService = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => qs.stringify(params, { indices: true }),
});

httpService.interceptors.request.use(
  (config) => {
    const accessToken = useLocalStorage(ACCESS_TOKEN, '');

    if (config.data && !(config.data instanceof FormData))
      config.data = utils.shared.convertToSnakeCase(config.data);
    if (config.params)
      config.params = utils.shared.convertToSnakeCase(config.params);
    if (accessToken.value)
      config.headers.Authorization = `Bearer ${accessToken.value}`;
    return config;
  },
  (error) => Promise.reject(error),
);

httpService.interceptors.response.use(
  (response: AxiosResponse<TSuccessResponse>) => {
    if (response.data)
      response.data = utils.shared.convertToCamelCase(response.data);
    return response;
  },
  (error: AxiosError<TFailureResponse>) => {
    const status = error.response?.status;

    if (status === HttpStatusCode.Unauthorized)
      utils.http.handleUnauthorizedError(error);

    return Promise.reject(error);
  },
);

export default httpService;
