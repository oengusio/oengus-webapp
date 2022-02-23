import Vue from 'vue';
import { ActionTree, MutationTree } from 'vuex';
import { OengusAPI } from '~/plugins/oengus';
import { Donation, DonationState, DonationStats } from '~/types/api/donation';
import { OengusPagination } from '~/types/api/oengus-api';

const DonationOengusAPI = new OengusAPI<DonationState>('marathons');

export const state = (): DonationState => ({
  donations: { },
  stats: { },
});

export const mutations: MutationTree<DonationState> = {
  addDonations(state, { id, value: donations, data }): void {
    Vue.set(state.donations, `${id}-${data.page}-${data.size}`, donations);
  },
  addStats(state, { id, value: stats }): void {
    Vue.set(state.stats, id, stats);
  },
};

export const actions: ActionTree<DonationState, DonationState> = {
  get: DonationOengusAPI.get<OengusPagination<Donation>>({ path: 'donations', key: 'donations' }),
  stats: DonationOengusAPI.get<DonationStats>({ path: 'donations/stats', key: 'stats' }),
};
