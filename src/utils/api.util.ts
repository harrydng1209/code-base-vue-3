import type {
  TFailureResponse,
  TSuccessResponse,
} from '@/models/types/auth.type';
import type { TLoadingTargets } from '@/models/types/shared.type';
import type { ElLoading } from 'element-plus';

import apiConfig from '@/configs/api.config';
import { AUTH } from '@/constants/route-pages.const';
import { ERROR_CODES, STORAGE_KEYS } from '@/constants/shared.const';
import { EResponseStatus } from '@/models/enums/auth.enum';
import useAuthStore from '@/stores/auth.store';
import { hideLoading, showLoading, showToast } from '@/utils/shared.util';
import { useLocalStorage } from '@vueuse/core';
import {
  type AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
  isAxiosError,
} from 'axios';

interface IAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

type TMethods = 'delete' | 'get' | 'patch' | 'post' | 'put';

const request = async <D = unknown, M = unknown>(
  method: TMethods,
  url: string,
  data: unknown,
  config?: AxiosRequestConfig,
  loadingTarget?: TLoadingTargets,
  toastMessage?: string,
) => {
  let loadingInstance: null | ReturnType<typeof ElLoading.service> = null;

  try {
    if (loadingTarget) loadingInstance = showLoading(loadingTarget);

    const response: AxiosResponse<TSuccessResponse<D, M>> = await apiConfig[
      method
    ](url, data, config);

    if (toastMessage) showToast(toastMessage);

    const result: TSuccessResponse<D, M> = {
      data: response.data.data,
      meta: response.data.meta,
      status: EResponseStatus.Success,
      statusCode: response.status,
    };
    return result;
  } catch (error) {
    let errorCode = ERROR_CODES.ERR_500;
    let errorData = null;
    let errorMessage = 'An error occurred';
    let statusCode = 500;

    if (isAxiosError<TFailureResponse>(error)) {
      errorCode = error.response?.data.error.code || errorCode;
      errorData = error.response?.data.error.data || errorData;
      errorMessage = error.response?.data.error.message || errorMessage;
      statusCode = error.response?.status || statusCode;
    }

    const result: TFailureResponse = {
      error: {
        code: errorCode,
        data: errorData,
        message: errorMessage,
      },
      status: EResponseStatus.Failure,
      statusCode,
    };
    return Promise.reject(result);
  } finally {
    hideLoading(loadingInstance);
  }
};

export const del = async <D = unknown, M = unknown>(
  url: string,
  config?: AxiosRequestConfig,
  loadingTarget?: TLoadingTargets,
  toastMessage?: string,
) => {
  return await request<D, M>(
    'delete',
    url,
    undefined,
    config,
    loadingTarget,
    toastMessage,
  );
};

export const get = async <D = unknown, M = unknown>(
  url: string,
  config?: AxiosRequestConfig,
  loadingTarget?: TLoadingTargets,
  toastMessage?: string,
) => {
  return await request<D, M>(
    'get',
    url,
    undefined,
    config,
    loadingTarget,
    toastMessage,
  );
};

export const handleUnauthorizedError = async (
  error: AxiosError<TFailureResponse>,
) => {
  const authStore = useAuthStore();
  const isTokenRefreshed = await authStore.refreshToken();

  if (!isTokenRefreshed) {
    authStore.logout();
    window.location.href = AUTH.LOGIN;
    return;
  }

  const accessToken = useLocalStorage(STORAGE_KEYS.ACCESS_TOKEN, '');
  const originalRequest = error.config as IAxiosRequestConfig;

  if (originalRequest) {
    if (!originalRequest.headers) originalRequest.headers = {};
    originalRequest.headers.Authorization = `Bearer ${accessToken.value}`;

    if (!originalRequest._retry) {
      originalRequest._retry = true;
      await apiConfig(originalRequest);
    }
  }
};

export const patch = async <D = unknown, M = unknown>(
  url: string,
  data: unknown,
  config?: AxiosRequestConfig,
  loadingTarget?: TLoadingTargets,
  toastMessage?: string,
) => {
  return await request<D, M>(
    'patch',
    url,
    data,
    config,
    loadingTarget,
    toastMessage,
  );
};

export const post = async <D = unknown, M = unknown>(
  url: string,
  data: unknown,
  config?: AxiosRequestConfig,
  loadingTarget?: TLoadingTargets,
  toastMessage?: string,
) => {
  return await request<D, M>(
    'post',
    url,
    data,
    config,
    loadingTarget,
    toastMessage,
  );
};

export const put = async <D = unknown, M = unknown>(
  url: string,
  data: unknown,
  config?: AxiosRequestConfig,
  loadingTarget?: TLoadingTargets,
  toastMessage?: string,
) => {
  return await request<D, M>(
    'put',
    url,
    data,
    config,
    loadingTarget,
    toastMessage,
  );
};
