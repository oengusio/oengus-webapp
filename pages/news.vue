<template>
  <NuxtChild />
</template>

<script lang="ts">
import Vue from 'vue';
import { MetaInfo } from 'vue-meta';

export default Vue.extend({
  head(): MetaInfo {
    return {
      titleTemplate: titleChunk => `${titleChunk ? `${titleChunk} | ` : ''}${this.$t('news.title')} | Oengus v2`,
    };
  },
});
</script>

<!-- Temporary language info to avoid having the i18n string -->
<i18n>
{
  "en-GB": {
    "news": {
      "title": "News"
    }
  }
}
</i18n>
