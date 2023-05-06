import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export type ConnectionPlatform =
  'DISCORD' |
  'EMAIL' |
  'FACEBOOK' |
  'INSTAGRAM' |
  'PHONE' |
  'NICO' |
  'MASTODON' |
  'SNAPCHAT' |
  'SPEEDRUNCOM' |
  'TWITCH' |
  'TWITTER';

export class SocialAccount {
  id?: number;
  platform: ConnectionPlatform | string;
  username: string;
}

export interface ConnectionMeta {
  linkBase?: (fragment: string) => string;
  icon: IconDefinition;
  header?: string;
  link?: string;
}

export type ConnectionMetas = Record<ConnectionPlatform, ConnectionMeta>;
