<template>
  <div>
    <AboutInfo />
    <AboutContact />
    <AboutPrivacy />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { MetaInfo } from 'vue-meta';

export default Vue.extend({
  head(): MetaInfo {
    return {
      title: this.$t('aboutPage.about.title') as string,
    };
  },
});
</script>
