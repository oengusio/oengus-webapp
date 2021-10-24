<template>
  <div class="box is-centered">
    <p>
      Info about the user '{{ userId }}'
    </p>
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
