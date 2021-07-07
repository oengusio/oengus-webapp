import Vue from 'vue';
import { ActionTree, MutationTree } from 'vuex';
import { AddExists, AddSearch, User, UserExists, UserState } from '~/types/api/user';

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
