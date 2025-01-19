import type {
  TFailureResponse,
  TSuccessResponse,
} from '@/models/types/auth.type';
import type { TLoadingTargets } from '@/models/types/shared.type';
import type { ElLoading } from 'element-plus';

import { EResponseStatus } from '@/models/enums/auth.enum';
import httpService from '@/services/http.service';
import useAuthStore from '@/stores/auth.store';
import { useLocalStorage } from '@vueuse/core';
import {
  type AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
  isAxiosError,
} from 'axios';

const { ACCESS_TOKEN } = constants.shared.STORAGE_KEYS;
const { ERR_500 } = constants.shared.ERROR_CODES;
const { AUTH } = constants.routePages;

interface IAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

type THttpMethods = 'delete' | 'get' | 'patch' | 'post' | 'put';

const request = async <D = unknown, M = unknown>(
  method: THttpMethods,
  url: string,
  data: unknown,
  config?: AxiosRequestConfig,
  loadingTarget?: TLoadingTargets,
  toastMessage?: string,
) => {
  let loadingInstance: null | ReturnType<typeof ElLoading.service> = null;

  try {
    loadingInstance = utils.shared.showLoading(loadingTarget || false);

    const response: AxiosResponse<TSuccessResponse<D, M>> = await httpService[
      method
    ](url, data, config);

    if (toastMessage) utils.shared.showToast(toastMessage);

    const result: TSuccessResponse<D, M> = {
      data: response.data.data,
      meta: response.data.meta,
      status: EResponseStatus.Success,
      statusCode: response.status,
    };
    return result;
  } catch (error) {
    let errorCode = ERR_500;
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
    utils.shared.hideLoading(loadingInstance);
  }
};

const http = {
  delete: async <D = unknown, M = unknown>(
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
  },

  get: async <D = unknown, M = unknown>(
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
  },

  handleUnauthorizedError: async (error: AxiosError<TFailureResponse>) => {
    const authStore = useAuthStore();
    const isTokenRefreshed = await authStore.refreshToken();

    if (!isTokenRefreshed) {
      authStore.logout();
      window.location.href = AUTH.LOGIN;
      return;
    }

    const accessToken = useLocalStorage(ACCESS_TOKEN, '');
    const originalRequest = error.config as IAxiosRequestConfig;

    if (originalRequest) {
      if (!originalRequest.headers) originalRequest.headers = {};
      originalRequest.headers.Authorization = `Bearer ${accessToken.value}`;

      if (!originalRequest._retry) {
        originalRequest._retry = true;
        await httpService(originalRequest);
      }
    }
  },

  patch: async <D = unknown, M = unknown>(
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
  },

  post: async <D = unknown, M = unknown>(
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
  },

  put: async <D = unknown, M = unknown>(
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
  },
};

export default http;
