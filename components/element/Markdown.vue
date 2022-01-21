<template>
  <article class="content markdown-container" v-html="$md.render(markdown)" />
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    markdown: {
      type: String,
      default: '',
    },
  },
});
</script>
