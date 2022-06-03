import Vue from 'vue';
import { ActionTree, MutationTree } from 'vuex';
import { OengusAPI } from '~/plugins/oengus';
import { PatreonState, Patrons } from '~/types/api/patreon';

// "Go back" to strip the api version from the endpoint
const PatreonOengusAPI = new OengusAPI<PatreonState>('../patreon');

export const state = (): PatreonState => ({
  patrons: undefined,
});

export const mutations: MutationTree<PatreonState> = {
  addPatrons(state, { value: patrons }): void {
    Vue.set(state, 'patrons', patrons);
  },
};

export const actions: ActionTree<PatreonState, PatreonState> = {
  patrons: PatreonOengusAPI.get<Patrons>({ path: 'patrons', key: 'patrons' }),
};
