<template>
  <NuxtChild />
</template>

<script lang="ts">
import Vue from 'vue';
import { MetaInfo } from 'vue-meta';

export default Vue.extend({
  head(): MetaInfo {
    return {
      title: this.$t('navbar.login.title') as string,
    };
  },
});
</script>
