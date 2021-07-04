import { ActionTree, MutationTree } from 'vuex';

export interface User {
  banned: boolean;
  discordName: string;
  enabled: boolean;
  history: Array<any>;
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

export const state = (): UserState => ({
  users: { },
  exists: { },
  searches: { },
});

export const mutations: MutationTree<UserState> = {
  addUser(state, user: User): void {
    state.users[user.username] = user;
  },
  addExists(state, { username, exists }: AddExists): void {
    state.exists[username] = exists;
  },
  addSearch(state, { query, search }: AddSearch): void {
    state.searches[query] = search;
  },
};

export const actions: ActionTree<UserState, UserState> = {
  async get({ commit }, username: string): Promise<void> {
    const user: User = await this.$http.$get(`/users/${username}`);
    if (user) {
      commit('addUser', user);
    }
  },
  async exists({ commit }, username: string): Promise<void> {
    const exists: UserExists = await this.$http.$get(`/users/${username}/exists`);
    commit('addExists', { username, exists: !!exists.exists } as AddExists);
  },
  async search({ commit }, query: string): Promise<void> {
    const search: Array<User> = await this.$http.$get(`/users/${query}/search`);
    commit('addSearch', search);
  },
};
