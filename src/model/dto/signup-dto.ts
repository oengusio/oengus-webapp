import { SocialAccount } from '../social-account';

export interface SignupDto {
  displayName: string;
  username: string;
  country: string | null;
  pronouns: string[];
  languagesSpoken: string[];
  email: string;
  password: string;
  connections: SocialAccount[];
}

export interface SignupResponseDto {
  status: 'SIGNUP_SUCCESS' | 'USERNAME_TAKEN';
}
