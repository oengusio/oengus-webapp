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
      type: Object as () => Date|string,
      // Because the type is an object, lint wants this
      default: () => new Date(),
    },
  },
});
</script>
