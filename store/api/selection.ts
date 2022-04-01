import Vue from 'vue';
import { ActionTree, MutationTree } from 'vuex';
import { OengusAPI } from '~/plugins/oengus';
import { Selections, SelectionState } from '~/types/api/selection';

const SelectionOengusAPI = new OengusAPI<SelectionState>('marathons');

export const state = (): SelectionState => ({
  selections: { },
});

export const mutations: MutationTree<SelectionState> = {
  addSelections(state, { id, value: selections }): void {
    Vue.set(state.selections, id, selections);
  },
};

export const actions: ActionTree<SelectionState, SelectionState> = {
  get: SelectionOengusAPI.get<Selections>({ path: 'selections', key: 'selections', cacheDuration: 15 * 60_000 }),
};
