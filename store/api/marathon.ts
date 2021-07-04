import { ActionTree, MutationTree } from 'vuex';
import { MarathonState } from '~/types/api/marathon';

export const state = (): MarathonState => ({
  marathons: { },
});

export const mutations: MutationTree<MarathonState> = {

};

export const actions: ActionTree<MarathonState, MarathonState> = {

};
