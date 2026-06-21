import { SocialAccount } from './social-account';

export const MAX_NAME_LENGTH = 32;

export interface BasicUserInfo {
  id: number;
  username: string;
  displayName: string;
}

export class User implements BasicUserInfo {
  id = -1;
  username = '';
  displayName = '';
  email = '';
  // stored as comma seperated list in db
  pronouns = '';
  languagesSpoken = '';
  mfaEnabled = false;
  emailVerified = false;
  country = '';
  roles: string[] = [];
  connections: SocialAccount[] = [];
  enabled = false;
  discordId = '';
  twitterId = '';
  twitchId = '';
  patreonId = '';
  savedGamesPublic = false;
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
  savedGamesPublic: boolean;
}

export interface UserSupporterStatus {
  sponsor: boolean;
  patreon: boolean;
  anySupporter: boolean;
}
