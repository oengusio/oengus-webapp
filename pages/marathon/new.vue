<template>
  <div>
    Oengus new marathon page stub
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { MetaInfo } from 'vue-meta';

export default Vue.extend({
  head(): MetaInfo {
    return {
      title: this.$t('marathon.new.title') as string,
    };
  },
});
</script>
