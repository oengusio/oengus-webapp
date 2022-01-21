<template>
  <NuxtChild />
</template>

<script lang="ts">
import Vue from 'vue';
import { MetaInfo } from 'vue-meta';

export default Vue.extend({
  head(): MetaInfo {
    return {
      titleTemplate: titleChunk => `${titleChunk ? `${titleChunk} | ` : ''}${this.$t('news.title')} | Oengus`,
    };
  },
});
</script>
