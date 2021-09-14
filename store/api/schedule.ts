import Vue from 'vue';
import { ActionTree, MutationTree } from 'vuex';
import { OengusAPI } from '~/plugins/oengus';
import { Schedule, ScheduleState, ScheduleTicker } from '~/types/api/schedule';

const ScheduleOengusAPI = new OengusAPI<ScheduleState>('marathons');

export const state = (): ScheduleState => ({
  schedules: { },
  tickers: { },
});

export const mutations: MutationTree<ScheduleState> = {
  addSchedule(state, { id, value: schedule }): void {
    Vue.set(state.schedules, id, schedule);
  },
  addTicker(state, { id, value: ticker }): void {
    Vue.set(state.tickers, id, ticker);
  },
};

export const actions: ActionTree<ScheduleState, ScheduleState> = {
  get: ScheduleOengusAPI.get<Schedule>({ path: 'schedule', key: 'schedules', mutation: 'addSchedule' }),
  ticker: ScheduleOengusAPI.get<ScheduleTicker>({ path: 'schedule/ticker', key: 'tickers', mutation: 'addTicker' }),
};
