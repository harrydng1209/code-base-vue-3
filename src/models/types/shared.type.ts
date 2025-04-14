import type { SELECTORS } from '@/constants/shared.const';

import { Dayjs } from 'dayjs';

export type TDate = Date | Dayjs | number | string;

export type TLoadingTargets =
  | 'fullscreen'
  | (typeof SELECTORS)[keyof typeof SELECTORS];

export type TObjectBoolean = Record<string, boolean>;
export type TObjectString = Record<string, string>;
export type TObjectUnknown = Record<string, unknown>;

export type TOptions<V = boolean | number | string | TObjectUnknown> = {
  key?: number | string;
  label: string;
  value: V;
};
