<template>
  <div class="social-container">
    This is a social container
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    userId: {
      type: String,
      default: '',
    },
  },
});
</script>
