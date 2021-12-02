<template>
  <div>
    Oengus marathon incentives management page stub
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { MetaInfo } from 'vue-meta';

export default Vue.extend({
  head(): MetaInfo {
    return {
      title: this.$t('marathon.incentives.management.title') as string,
    };
  },
});
</script>
