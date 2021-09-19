<template>
  <time :datetime="duration">{{ $temporal.duration.toHumanReadable(duration) }}</time>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    duration: {
      type: String,
      // Default to 0 seconds
      default: 'PT0S',
    },
  },
});
</script>
