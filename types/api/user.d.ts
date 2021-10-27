import { OengusState } from '~/plugins/oengus';

export interface User {
  banned: boolean;
  connections: Array<Connection>;
  country: string|null;
  discordName: string;
  enabled: boolean;
  history: Array<any>; // Array<Horribly Nested User History... Thing>
  id: number;
  languagesSpoken: Array<string>;
  moderatedMarathons: Array<any>; // What are these?
  pronouns: Array<string>;
  speedruncomName: string;
  twitchName: string;
  twitterName: string;
  username: string;
  usernameJapanese: string;
}

export interface UserExists {
  exists: boolean;
}

export interface AddSearch {
  query: string;
  search: Array<User>;
}

export interface UserState extends OengusState {
  users: { [username: string]: User; };
  exists: { [username: string]: UserExists; };
  searches: { [query: string]: Array<User>; };
}

// This ended up being kinda social. Move to its own file?

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
