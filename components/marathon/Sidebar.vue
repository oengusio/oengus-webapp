<template>
  <nav class="menu box">
    <h4 class="title is-4">
      {{ marathon }} Name
    </h4>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      marathon: this.$route.params.marathon,
    };
  },
});
</script>
