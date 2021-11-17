import { Connection } from './connection';
import { History } from './history';
import { Marathon } from './marathon';
import { OengusState } from './oengus-api';

export interface User {
  banned: boolean;
  connections: Array<Connection>;
  country: string|null;
  discordName: string;
  enabled: boolean;
  history: Array<History>;
  id: number;
  languagesSpoken: Array<string>;
  moderatedMarathons: Array<Marathon>;
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
