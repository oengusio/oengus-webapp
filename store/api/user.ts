import Vue from 'vue';
import { ActionTree, MutationTree } from 'vuex';
import { OengusAPI } from '~/plugins/oengus';
import { User, UserExists, UserState } from '~/types/api/user';

const UserOengusAPI = new OengusAPI<UserState>('users');

export const state = (): UserState => ({
  users: { },
  exists: { },
  searches: { },
});

export const mutations: MutationTree<UserState> = {
  addUser(state, { id, value: user }): void {
    Vue.set(state.users, id, user);
  },
  addExists(state, { id, value: exists }): void {
    Vue.set(state.exists, id, exists);
  },
  addSearch(state, { id, value: search }): void {
    Vue.set(state.searches, id, search);
  },
};

export const actions: ActionTree<UserState, UserState> = {
  get: UserOengusAPI.get<User>({ key: 'users', mutation: 'addUser' }),
  exists: UserOengusAPI.get<UserExists, boolean>({
    path: 'exists',
    key: 'exists',
    transform: userExists => !!userExists.exists,
  }),
  search: UserOengusAPI.get<Array<User>>({
    path: 'search',
    key: 'searches',
    mutation: 'addSearch',
  }),
};
