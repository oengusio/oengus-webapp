<template>
  <div>
    Oengus marathon selection page stub
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { MetaInfo } from 'vue-meta';

export default Vue.extend({
  head(): MetaInfo {
    return {
      title: this.$t('marathon.selection.title') as string,
    };
  },
});
</script>
