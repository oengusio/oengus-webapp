<template>
  <time :datetime="start">{{ $temporal.range.format(start, end, format) }}</time>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    start: {
      type: String,
      // The Date() function returns a string denoting "now"
      default: () => Date(),
    },
    end: {
      type: String,
      default: () => Date(),
    },
    format: {
      type: String,
      default: 'mediumDateTime',
    },
  },
});
</script>
