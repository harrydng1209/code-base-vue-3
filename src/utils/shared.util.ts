import { EDataType } from '@/models/enums/shared.enum';
import type { TDataObject, TLoadingTarget } from '@/models/types/shared.type';
import { mapKeys, snakeCase, camelCase } from 'lodash-es';
import qs from 'qs';
import storeService from '@/services/store.service';
import { EToast } from '@/models/enums/shared.enum';
import { ElNotification, ElLoading } from 'element-plus';
import { capitalize } from 'lodash-es';

const shared = {
  showToast: (message: string, type: EToast = EToast.Success, title: string = capitalize(type)) => {
    ElNotification({
      message,
      type,
      title,
      duration: 3000
    });
  },
  showLoading: (target: TLoadingTarget) => {
    if (target === false) return null;

    if (target === 'full-screen')
      return ElLoading.service({ lock: true, text: 'Loading', background: 'rgba(0, 0, 0, 0.7)' });

    const element = document.getElementById(target);
    if (element) {
      element.classList.add('tw-pointer-events-none');
      return ElLoading.service({
        lock: true,
        target: element as HTMLElement
      });
    }

    return null;
  },
  hideLoading: (loadingInstance: ReturnType<typeof ElLoading.service> | null) => {
    if (loadingInstance) {
      loadingInstance.close();
      const element = loadingInstance.target.value;
      if (element && element instanceof HTMLElement)
        element.classList.remove('tw-pointer-events-none');
    }
  },
  storeDisposeAll: () => {
    storeService.disposeAll();
  },
  storeResetAll: () => {
    storeService.resetAll();
  },
  sleep: (second: number) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000 * second);
    });
  },
  convertToSnakeCase: (data: TDataObject | TDataObject[]): TDataObject | TDataObject[] => {
    if (Array.isArray(data)) return data.map((item) => shared.convertToSnakeCase(item));
    if (data && typeof data === EDataType.Object) return mapKeys(data, (_, key) => snakeCase(key));
    return data;
  },
  convertToCamelCase: (data: TDataObject | TDataObject[]): TDataObject | TDataObject[] => {
    if (Array.isArray(data)) return data.map((item) => shared.convertToCamelCase(item));
    if (data && typeof data === EDataType.Object) return mapKeys(data, (_, key) => camelCase(key));
    return data;
  },
  formatQueryString: (baseUrl: string, query: string | string[] | Record<string, any>): string => {
    if (
      !query ||
      (Array.isArray(query) && query.length === 0) ||
      (typeof query === EDataType.Object && Object.keys(query).length === 0)
    )
      return baseUrl;

    const queryString =
      typeof query === EDataType.String ? query : qs.stringify(query, { arrayFormat: 'brackets' });
    return `${baseUrl}?${queryString}`;
  }
};

export default shared;
