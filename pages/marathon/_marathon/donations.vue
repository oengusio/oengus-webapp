<template>
  <div>
    <h3 class="title is-3">
      {{ $t('marathon.donations.title') }}
    </h3>

    <MarathonDonationList :marathon-id="marathonId" />
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
      title: this.$t('marathon.donations.title') as string,
    };
  },
});
</script>
