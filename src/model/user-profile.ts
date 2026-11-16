import { SocialAccount } from './social-account';

export class UserProfile {
  id = -1;
  username = '';
  displayName = '';
  bio = '';
  enabled = false;
  pronouns: string[] = [];
  languagesSpoken: string[] = [];
  connections: SocialAccount[] = [];
  country = '';
  banned = false;
  savedGamesPublic = false;
}
