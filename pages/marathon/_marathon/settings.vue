<template>
  <div>
    Oengus marathon settings page stub
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { MetaInfo } from 'vue-meta';

export default Vue.extend({
  head(): MetaInfo {
    return {
      title: this.$t('marathon.settings.title') as string,
    };
  },
});
</script>
