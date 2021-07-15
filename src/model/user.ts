import SocialAccount from './social-account';

export class User {

  id: number;
  username: string;
  usernameJapanese: string;
  mail: string;
  // stored as comma seperated list in db
  pronouns: string;
  country: string;
  roles: string[];
  connections: SocialAccount[];
  enabled: boolean;
  discordId: number;
  twitterId: string;
  twitchId: string;

  // TODO: remove
  /**
   * @deprecated
   */
  twitterName: string;
  /**
   * @deprecated
   */
  twitchName: string;
  /**
   * @deprecated
   */
  discordName: string;
  /**
   * @deprecated
   */
  speedruncomName: string;
}
