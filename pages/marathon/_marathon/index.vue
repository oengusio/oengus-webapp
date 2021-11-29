<template>
  <div class="marathon-mainpage-container">
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

<style lang="scss" scoped>
.marathon-mainpage-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing);
}
</style>
