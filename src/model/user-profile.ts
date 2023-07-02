import { UserProfileHistory } from './user-profile-history';
import { Marathon } from './marathon';
import { SocialAccount } from './social-account';

export class UserProfile {
  id: number;
  username: string;
  displayName: string;
  enabled: boolean;
  pronouns: string[];
  languagesSpoken: string[];
  connections: SocialAccount[];
  history: UserProfileHistory[];
  moderatedMarathons: Marathon[];
  country: string;
  banned: boolean;
}
