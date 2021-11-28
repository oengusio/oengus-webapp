<template>
  <div>
    <MarathonDetails :marathon-id="marathonId" />
    <MarathonDescription :marathon-id="marathonId" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      marathonId: this.$route.params.marathon,
    };
  },
});
</script>
