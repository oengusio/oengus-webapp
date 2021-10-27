<template>
  <time :datetime="datetime">{{ $d(date, format) }}</time>
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
    format: {
      type: String,
      default: 'mediumDateTime',
    },
  },

  computed: {
    date(): Date {
      return new Date(this.datetime);
    },
  },
});
</script>
