import type { TLoadingTarget, TSuccessResponse } from '@/models/types/shared.type';
import type { IFailureResponse } from '@/models/interfaces/shared.interface';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { EResponseStatus, EToast } from '@/models/enums/shared.enum';
import httpService from '@/services/http.service';
import type { ElLoading } from 'element-plus';

type TApiRequestMethod =
  (typeof constants.shared.API_REQUEST_METHODS)[keyof typeof constants.shared.API_REQUEST_METHODS];

const request = async <T = any, M = any>(
  method: TApiRequestMethod,
  url: string,
  data: any,
  config?: AxiosRequestConfig,
  loadingTarget?: TLoadingTarget,
  toastMessage?: string
): Promise<TSuccessResponse<T, M> | IFailureResponse> => {
  let loadingInstance: ReturnType<typeof ElLoading.service> | null = null;

  try {
    loadingInstance = utils.shared.showLoading(loadingTarget || false);

    const response: AxiosResponse<TSuccessResponse<T, M>> = await httpService[method](
      url,
      data,
      config
    );
    if (toastMessage) utils.shared.showToast(toastMessage);

    return {
      status: EResponseStatus.Success,
      data: response.data.data,
      meta: response.data.meta
    } as TSuccessResponse<T, M>;
  } catch (error: any) {
    const errorMessage = error.response?.data?.error?.message || 'An error occurred';
    const errorCode = error.response?.data?.error?.code || 500;

    if (toastMessage) utils.shared.showToast(errorMessage, EToast.Error);

    throw {
      status: EResponseStatus.Failure,
      error: {
        message: errorMessage,
        code: errorCode
      }
    } as IFailureResponse;
  } finally {
    utils.shared.hideLoading(loadingInstance);
  }
};

const http = {
  get: async <T = any, M = any>(
    url: string,
    config?: AxiosRequestConfig,
    loadingTarget?: TLoadingTarget,
    toastMessage?: string
  ) => {
    return await request<T, M>(
      constants.shared.API_REQUEST_METHODS.GET,
      url,
      undefined,
      config,
      loadingTarget,
      toastMessage
    );
  },
  post: async <T = any, M = any>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
    loadingTarget?: TLoadingTarget,
    toastMessage?: string
  ) => {
    return await request<T, M>(
      constants.shared.API_REQUEST_METHODS.POST,
      url,
      data,
      config,
      loadingTarget,
      toastMessage
    );
  },
  put: async <T = any, M = any>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
    loadingTarget?: TLoadingTarget,
    toastMessage?: string
  ) => {
    return await request<T, M>(
      constants.shared.API_REQUEST_METHODS.PUT,
      url,
      data,
      config,
      loadingTarget,
      toastMessage
    );
  },
  del: async <T = any, M = any>(
    url: string,
    config?: AxiosRequestConfig,
    loadingTarget?: TLoadingTarget,
    toastMessage?: string
  ) => {
    return await request<T, M>(
      constants.shared.API_REQUEST_METHODS.DELETE,
      url,
      undefined,
      config,
      loadingTarget,
      toastMessage
    );
  },
  patch: async <T = any, M = any>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
    loadingTarget?: TLoadingTarget,
    toastMessage?: string
  ) => {
    return await request<T, M>(
      constants.shared.API_REQUEST_METHODS.PATCH,
      url,
      data,
      config,
      loadingTarget,
      toastMessage
    );
  }
};

export default http;
