<template>
  <div class="submissions-container">
    <h3 class="title is-3">
      {{ $t('marathon.submissions.title') }}
    </h3>

    <MarathonSubmissionsUserList :marathon-id="marathonId" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { MetaInfo } from 'vue-meta';
import { OengusStateValue } from '~/types/api/oengus-api';
import { Selections, SelectionState } from '~/types/api/selection';
import { SubmissionList, SubmissionState } from '~/types/api/submission';

export default Vue.extend({
  middleware({ store, route }): void {
    if (process.server) {
      return;
    }

    const submissionList = (store.state.api.submission as SubmissionState).submissions[route.params.marathon] as OengusStateValue<SubmissionList>;
    const selections = (store.state.api.selection as SelectionState).selections[route.params.marathon] as OengusStateValue<Selections>;
    if ((submissionList?._fetching === false) && (selections?._fetching === false)) {
      const cacheExpiration = Math.min(submissionList._expiresAt, selections._expiresAt);
      if (cacheExpiration - 5_000 > Date.now()) {
        // We have the data in the cache, so no need to use the SSR
        return;
      }
    }

    location.href = route.fullPath;
  },

  data() {
    return {
      marathonId: this.$route.params.marathon,
    };
  },

  head(): MetaInfo {
    return {
      title: this.$t('marathon.submissions.title') as string,
    };
  },
});
</script>

<style lang="scss" scoped>
.submissions-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing);

  > * {
    margin: 0;
  }
}
</style>
