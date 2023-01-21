import Vue from 'vue';
import { ActionTree, MutationTree } from 'vuex';
import { OengusAPI } from '~/plugins/oengus';
import { Submission, SubmissionList, SubmissionState } from '~/types/api/submission';

const SubmissionOengusAPI = new OengusAPI<SubmissionState>('marathons');

export const state = (): SubmissionState => ({
  submissions: { },
});

export const mutations: MutationTree<SubmissionState> = {
  addSubmissions(state, { id, value: submissions }): void {
    Vue.set(state.submissions, id, submissions);
  },
};

// TODO: implement pagination
export const actions: ActionTree<SubmissionState, SubmissionState> = {
  get: SubmissionOengusAPI.get<{ content: Array<Submission> }, SubmissionList>({
    path: 'submissions',
    key: 'submissions',
    transform: ({ value }) => ({ submissions: value.content }),
    cacheDuration: 15 * 60_000,
  }),
};
