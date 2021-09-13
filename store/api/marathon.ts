import Vue from 'vue';
import { ActionTree, MutationTree } from 'vuex';
import { OengusAPI } from '~/plugins/oengus';
import { FrontPageMarathons, FullMarathon, MarathonState } from '~/types/api/marathon';

const MarathonOengusAPI = new OengusAPI<MarathonState>('marathons');

export const state = (): MarathonState => ({
  marathons: { },
  frontPage: undefined,
});

export const mutations: MutationTree<MarathonState> = {
  addMarathon(state, { id, value: marathon }): void {
    Vue.set(state.marathons, id, marathon);
  },
  addFrontPage(state, { value: frontPage }): void {
    Vue.set(state, 'frontPage', frontPage);
  },
};

export const actions: ActionTree<MarathonState, MarathonState> = {
  get: MarathonOengusAPI.get<FullMarathon>({ key: 'marathons', mutation: 'addMarathon' }),
  frontPage: MarathonOengusAPI.get<FrontPageMarathons>({ key: 'frontPage' }),
};
