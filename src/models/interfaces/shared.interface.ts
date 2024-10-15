import type { EResponseStatus, ERole } from '@/models/enums/shared.enum';

export interface IFailureResponse {
  status: EResponseStatus;
  error: {
    message: string;
    code: number;
  };
}

export interface IUserInfo {
  role: ERole;
}
