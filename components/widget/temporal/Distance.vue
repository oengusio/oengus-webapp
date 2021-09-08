<template>
  <time :datetime="datetime">
    {{ $temporal.distance.format(datetime) }}
  </time>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    datetime: {
      type: String,
      // The Date() function returns a string denoting "now"
      default: () => Date(),
    },
  },
});
</script>
