<template>
  <div>
    <WidgetLoading :while="[ submissionsWrapper ]" />

    <ElementTable v-if="submissions" class="submissions-user-table">
      <!-- <ElementTableCell is-header>
        {{ $t('marathon.submissions.table.runner') }}
      </ElementTableCell> -->

      <MarathonSubmissionsUserRow v-for="(submission, index) in submissions" :key="submission.id" :submission="submission" :selections="selections" :class="getRowParity(index)" />
    </ElementTable>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { Selections, SelectionState } from '~/types/api/selection';
import { Submission, SubmissionList, SubmissionState } from '~/types/api/submission';

export default Vue.extend({
  props: {
    marathonId: {
      type: String,
      default: '',
    },
  },

  async fetch(): Promise<void> {
    await Promise.allSettled([
      this.getSubmissions(this.marathonId),
      this.getSelections(this.marathonId),
    ]);
  },

  computed: {
    submissionsWrapper(): SubmissionList|undefined {
      return (this.$store.state.api.submission as SubmissionState).submissions[this.marathonId];
    },
    submissions(): Array<Submission>|undefined {
      return this.submissionsWrapper?.submissions;
    },
    selections(): Selections|undefined {
      return (this.$store.state.api.selection as SelectionState).selections[this.marathonId];
    },
  },

  methods: {
    getRowParity(index: number): { 'is-even': boolean, 'is-odd': boolean } {
      return {
        'is-even': index % 2 === 0,
        'is-odd': index % 2 === 1,
      };
    },
    ...mapActions({
      getSubmissions: 'api/submission/get',
      getSelections: 'api/selection/get',
    }),
  },
});
</script>

<style lang="scss" scoped>
@use '~assets/table';

.submissions-user-table {
  @include table.shrink(6);
}
</style>
