export interface LoginDetails {
  username: string;
  password: string;
  twoFactorCode: string | null;
}

export interface LoginResponse {
  token: string | null;
  status: LoginResponseStatus;
}

export enum LoginResponseStatus {
  MFA_REQUIRED = 'MFA_REQUIRED',
  MFA_INVALID = 'MFA_INVALID',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  USERNAME_PASSWORD_INCORRECT = 'USERNAME_PASSWORD_INCORRECT',
}
