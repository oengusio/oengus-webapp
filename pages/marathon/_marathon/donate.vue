<template>
  <div>
    Oengus marathon donate page stub
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { MetaInfo } from 'vue-meta';

export default Vue.extend({
  head(): MetaInfo {
    return {
      title: this.$t('marathon.donate.title') as string,
    };
  },
});
</script>
