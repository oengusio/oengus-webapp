import Vue from 'vue';
import { ActionTree, MutationTree } from 'vuex';
import { OengusAPI } from '~/plugins/oengus';
import { AddExists, AddSearch, User, UserExists, UserState } from '~/types/api/user';

const UserOengusAPI = new OengusAPI<UserState>('users');

export const state = (): UserState => ({
  users: { },
  exists: { },
  searches: { },
});

export const mutations: MutationTree<UserState> = {
  addUser(state, user: User): void {
    Vue.set(state.users, user.username, user);
  },
  addExists(state, { username, exists }: AddExists): void {
    Vue.set(state.exists, username, exists);
  },
  addSearch(state, { query, search }: AddSearch): void {
    Vue.set(state.searches, query, search);
  },
};

export const actions: ActionTree<UserState, UserState> = {
  get: UserOengusAPI.get<User>({ key: 'users', mutation: 'addUser' }),
  exists: UserOengusAPI.get<UserExists, AddExists>({
    path: 'exists',
    key: 'exists',
    transform: (userExists, username: string) => ({ username, exists: !!userExists.exists }),
  }),
  search: UserOengusAPI.get<Array<User>, AddSearch>({
    path: 'search',
    key: 'searches',
    mutation: 'addSearch',
    transform: (search, query: string) => ({ query, search }),
  }),
};
