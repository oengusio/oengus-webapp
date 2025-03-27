import { SocialAccount } from './social-account';

export const MAX_NAME_LENGTH = 32;

export interface BasicUserInfo {
  id: number;
  username: string;
  displayName: string;
}

export class User implements BasicUserInfo {

  id: number;
  username: string;
  displayName: string;
  email: string;
  // stored as comma seperated list in db
  pronouns: string;
  languagesSpoken: string;
  mfaEnabled: boolean;
  emailVerified: boolean;
  country: string;
  roles: string[];
  connections: SocialAccount[];
  enabled: boolean;
  discordId: string;
  twitterId: string;
  twitchId: string;
  patreonId: string;
}

export interface SelfUser extends BasicUserInfo {
  email: string;
  pronouns: string[];
  languagesSpoken: string[];
  country: string;
  roles: string[];
  connections: SocialAccount[];

  enabled: boolean;
  mfaEnabled: boolean;
  emailVerified: boolean;

  discordId: string;
  twitchId: string;
  patreonId: string;

  createdAt: string;
  lastLogin: string;
}

export interface UserSupporterStatus {
  sponsor: boolean;
  patreon: boolean;
  anySupporter: boolean;
}
