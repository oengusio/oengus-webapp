<template>
  <div>
    Oengus marathon incentives view page stub
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { MetaInfo } from 'vue-meta';

export default Vue.extend({
  head(): MetaInfo {
    return {
      title: this.$t('marathon.incentives.title') as string,
    };
  },
});
</script>
