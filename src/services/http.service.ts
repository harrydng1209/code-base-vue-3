import type {
  TFailureResponse,
  TSuccessResponse,
} from '@/models/types/auth.type';

import { STORAGE_KEYS } from '@/constants/shared.const';
import { handleUnauthorizedError } from '@/utils/http.util';
import { convertToCamelCase, convertToSnakeCase } from '@/utils/shared.util';
import { useLocalStorage } from '@vueuse/core';
import axios, {
  type AxiosError,
  type AxiosResponse,
  HttpStatusCode,
} from 'axios';
import qs from 'qs';

const httpService = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => qs.stringify(params, { indices: true }),
});

httpService.interceptors.request.use(
  (config) => {
    const accessToken = useLocalStorage(STORAGE_KEYS.ACCESS_TOKEN, '');

    if (config.data && !(config.data instanceof FormData))
      config.data = convertToSnakeCase(config.data);
    if (config.params) config.params = convertToSnakeCase(config.params);
    if (accessToken.value)
      config.headers.Authorization = `Bearer ${accessToken.value}`;
    return config;
  },
  (error) => Promise.reject(error),
);

httpService.interceptors.response.use(
  (response: AxiosResponse<TSuccessResponse>) => {
    if (response.data) response.data = convertToCamelCase(response.data);
    return response;
  },
  (error: AxiosError<TFailureResponse>) => {
    const status = error.response?.status;

    if (status === HttpStatusCode.Unauthorized) handleUnauthorizedError(error);

    return Promise.reject(error);
  },
);

export default httpService;
