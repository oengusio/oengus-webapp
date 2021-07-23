import { UserProfileHistory } from './user-profile-history';
import { Marathon } from './marathon';
import { SocialAccount } from './social-account';

export class UserProfile {
  id: number;
  username: string;
  usernameJapanese: string;
  enabled: boolean;
  pronouns: string[];
  languagesSpoken: string[];
  connections: SocialAccount[];
  history: UserProfileHistory[];
  moderatedMarathons: Marathon[];
  avatarHash: string;
  country: string;
  banned: boolean;
}
