<template>
  <div>
    <MarathonDescription :marathon="marathon" />
  </div>
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
