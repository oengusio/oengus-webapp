<template>
  <article v-if="description" class="content" v-html="$md.render(description)" />
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    description: {
      type: String,
      default: '',
    },
  },
});
</script>
