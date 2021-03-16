import { UserProfileHistory } from './user-profile-history';
import { Marathon } from './marathon';

export class UserProfile {

  id: number;
  username: string;
  usernameJapanese: string;
  enabled: boolean;
  twitterName: string;
  twitchName: string;
  discordName: string;
  speedruncomName: string;
  history: UserProfileHistory[];
  moderatedMarathons: Marathon[];
  banned: boolean;

}
