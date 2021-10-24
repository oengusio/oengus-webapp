<template>
  <div>
    This is a nice list of the moderation history. It will hide when submissions are shown.
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      userId: this.$route.params.user,
    };
  },
});
</script>
