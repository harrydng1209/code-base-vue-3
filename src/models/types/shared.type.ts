import type { EResponseStatus } from '@/models/enums/shared.enum';

export type TDataObject = Record<string, any> | null;
export type TDate = string | number | Date;
export type TLoadingTarget =
  | false
  | 'full-screen'
  | (typeof constants.shared.SELECTOR_IDS)[keyof typeof constants.shared.SELECTOR_IDS];

export type TSuccessResponse<T = any, M = any> = {
  status: EResponseStatus;
  data: T;
  meta: M;
};

export type TOptions<T = any> = {
  label: string;
  value: T;
};
