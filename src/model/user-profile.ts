import { UserProfileHistory } from './user-profile-history';
import { Marathon } from './marathon';
import SocialAccount from './social-account';

export class UserProfile {
  id: number;
  username: string;
  usernameJapanese: string;
  enabled: boolean;
  connections: SocialAccount[];
  history: UserProfileHistory[];
  moderatedMarathons: Marathon[];
  avatarHash: string;
  banned: boolean;
}
