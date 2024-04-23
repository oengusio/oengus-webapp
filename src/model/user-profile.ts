import { SocialAccount } from './social-account';

export class UserProfile {
  id: number;
  username: string;
  displayName: string;
  enabled: boolean;
  pronouns: string[];
  languagesSpoken: string[];
  connections: SocialAccount[];
  country: string;
  banned: boolean;
}
