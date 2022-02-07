import Vue from 'vue';
import { ActionTree, MutationTree } from 'vuex';
import { OengusAPI } from '~/plugins/oengus';
import { Incentive, IncentiveList, IncentiveState } from '~/types/api/incentive';

const IncentiveOengusAPI = new OengusAPI<IncentiveState>('marathons');

export const state = (): IncentiveState => ({
  incentives: { },
});

export const mutations: MutationTree<IncentiveState> = {
  addIncentives(state, { id, value: incentives }): void {
    Vue.set(state.incentives, id, incentives);
  },
};

export const actions: ActionTree<IncentiveState, IncentiveState> = {
  get: IncentiveOengusAPI.get<Array<Incentive>, IncentiveList>({
    path: 'incentives',
    key: 'incentives',
    transform: ({ value: incentives }) => ({ incentives }),
  }),
};
