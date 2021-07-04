export interface User {
  banned: boolean;
  discordName: string;
  enabled: boolean;
  history: Array<any>; // Array<Horribly Nested User History... Thing>
  speedruncomName: string;
  twitchName: string;
  twitterName: string;
  username: string;
  usernameJapanese: string;
}

export interface UserExists {
  exists?: boolean;
}

export interface AddExists {
  username: string;
  exists: boolean;
}

export interface AddSearch {
  query: string;
  search: Array<User>;
}

export interface UserState {
  users: { [username: string]: User; };
  exists: { [username: string]: boolean; };
  searches: { [query: string]: Array<User>; };
}
