export type ConnectionPlatform =
  'DISCORD' |
  'EMAIL' |
  'FACEBOOK' |
  'INSTAGRAM' |
  'PHONE' |
  'NICO' |
  'SNAPCHAT' |
  'SPEEDRUNCOM' |
  'TWITCH' |
  'TWITTER';

export interface Connection {
  id: number;
  platform: ConnectionPlatform;
  username: string;
}

export interface ConnectionMeta {
  linkBase?: (fragment: string) => string;
  icon: Array<String>;
  header?: string;
  link?: string;
}

export type ConnectionMetas = Record<ConnectionPlatform, ConnectionMeta>;
