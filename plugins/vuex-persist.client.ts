// Vuex Persist Config: https://www.npmjs.com/package/vuex-persist

import { Plugin } from '@nuxt/types';
import { VuexPersistence } from 'vuex-persist';

import { DonationState } from '~/types/api/donation';
import { IncentiveState } from '~/types/api/incentive';
import { MarathonState } from '~/types/api/marathon';
import { PatreonState } from '~/types/api/patreon';
import { ScheduleState } from '~/types/api/schedule';
import { UserState } from '~/types/api/user';

interface State {
  api: {
    category: { }; // CategoryState;
    donation: DonationState;
    incentive: IncentiveState;
    marathon: MarathonState;
    patreon: PatreonState;
    schedule: ScheduleState;
    selection: { }; // SelectionState;
    submission: { }; // SubmissionState;
    user: UserState;
  };
}

const vuexPersistPlugin: Plugin = ({ $localForage, store }) => {
  new VuexPersistence<State>({
    asyncStorage: true,
    async saveState(key, state) {
      await $localForage.setItem(key, JSON.stringify(state));
    },
    async restoreState(key) {
      const stateString: string|null = await $localForage.getItem(key);
      if (!stateString) {
        return store.state;
      }
      const state = JSON.parse(stateString) as State;
      // What the devil is this?!
      // This is an object that ensures two things: forward compatibility (even if forgotten) and newer objects first.
      // For single instance objects, we use store || state so if store is undefined, we load the saved state.
      // For collections of objects, we use ...state, ...store so store entries override state entries.
      // Each object also starts with ...store which ensures that new properties are always included automatically.
      // Some objects just list store and nothing else, these are known objects that simply don't do anything yet.
      return {
        ...store.state,
        api: {
          ...store.state.api,
          category: store.state.api.category,
          donation: {
            ...store.state.api.donation,
            donations: {
              ...state.api.donation.donations,
              ...store.state.api.donation.donations,
            },
            stats: {
              ...state.api.donation.stats,
              ...store.state.api.donation.stats,
            },
          },
          incentive: {
            ...store.state.api.incentive,
            incentives: {
              ...state.api.incentive.incentives,
              ...store.state.api.incentive.incentives,
            },
          },
          marathon: {
            ...store.state.api.marathon,
            marathons: {
              ...state.api.marathon.marathons,
              ...store.state.api.marathon.marathons,
            },
            calendars: {
              ...state.api.marathon.calendars,
              ...store.state.api.marathon.calendars,
            },
            frontPage: store.state.api.marathon.frontPage || state.api.marathon.calendars,
          },
          patreon: {
            ...store.state.api.patreon,
            patrons: store.state.api.patreon.patrons || state.api.patreon.patrons,
          },
          schedule: {
            ...store.state.api.schedule,
            schedules: {
              ...state.api.schedule.schedules,
              ...store.state.api.schedule.schedules,
            },
            tickers: {
              ...state.api.schedule.tickers,
              ...store.state.api.schedule.tickers,
            },
          },
          selection: store.state.api.selection,
          submission: store.state.api.submission,
          user: {
            ...store.state.api.user,
            users: {
              ...state.api.user.users,
              ...store.state.api.user.users,
            },
            exists: {
              ...state.api.user.exists,
              ...store.state.api.user.exists,
            },
            searches: {
              ...state.api.user.searches,
              ...store.state.api.user.searches,
            },
          },
        },
      };
    },
  }).plugin(store);
};

export default vuexPersistPlugin;
