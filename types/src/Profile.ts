import SocialAccount from './SocialAccount';

export default interface Profile {
  id: number;
  username: string;
  displayName: string;
  enabled: boolean;
  pronouns: string[];
  languagesSpoken: string[];
  connections: SocialAccount[];
  country: string;
}
