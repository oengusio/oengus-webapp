<template>
  <div>
    Oengus marathon donations page stub
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { MetaInfo } from 'vue-meta';

export default Vue.extend({
  head(): MetaInfo {
    return {
      title: this.$t('marathon.donations.title') as string,
    };
  },
});
</script>
