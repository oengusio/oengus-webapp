export interface LoginDetails {
  username: string;
  password: string;
  twoFactorCode: string | null;
}

export interface OauthLoginDetails {
  service: string;
  code: string;
}

export interface LoginResponse {
  token: string | null;
  status: LoginResponseStatus;
}

export enum LoginResponseStatus {
  MFA_REQUIRED = 'MFA_REQUIRED',
  MFA_INVALID = 'MFA_INVALID',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  ACCOUNT_DISABLED = 'ACCOUNT_DISABLED',
  OAUTH_ACCOUNT_NOT_FOUND = 'OAUTH_ACCOUNT_NOT_FOUND',
  USERNAME_PASSWORD_INCORRECT = 'USERNAME_PASSWORD_INCORRECT',
}

export interface InitMFADto {
  qrCode: string;
  secretKey: string;
}
