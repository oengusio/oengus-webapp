import { Connection } from './connection';
import { History } from './history';
import { OengusState } from '~/plugins/oengus';

export interface User {
  banned: boolean;
  connections: Array<Connection>;
  country: string|null;
  discordName: string;
  enabled: boolean;
  history: Array<History>; // Array<Horribly Nested User History... Thing>
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
