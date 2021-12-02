<template>
  <div>
    Oengus user settings Discord sync page stub
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { MetaInfo } from 'vue-meta';

export default Vue.extend({
  head(): MetaInfo {
    return {
      title: this.$t('user.settings.accountSync.title') as string,
    };
  },
});
</script>
