<template>
  <div>
    <h3 class="title is-3">
      {{ $t('marathon.incentives.title') }}
    </h3>

    <MarathonIncentiveList :marathon-id="marathonId" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { MetaInfo } from 'vue-meta';

export default Vue.extend({
  data() {
    return {
      marathonId: this.$route.params.marathon,
    };
  },

  head(): MetaInfo {
    return {
      title: this.$t('marathon.incentives.title') as string,
    };
  },
});
</script>
