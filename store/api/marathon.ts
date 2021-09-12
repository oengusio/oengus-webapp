import Vue from 'vue';
import { ActionTree, MutationTree } from 'vuex';
import { OengusAPI } from '~/plugins/oengus';
import { FrontPageMarathons, MarathonState } from '~/types/api/marathon';

const MarathonOengusAPI = new OengusAPI<MarathonState>('marathons');

export const state = (): MarathonState => ({
  marathons: { },
  frontPage: undefined,
});

export const mutations: MutationTree<MarathonState> = {
  addFrontPage(state, { value: frontPage }): void {
    Vue.set(state, 'frontPage', frontPage);
  },
};

export const actions: ActionTree<MarathonState, MarathonState> = {
  frontPage: MarathonOengusAPI.get<FrontPageMarathons>({ key: 'frontPage' }),
};
