<template>
  <div class="marathon-container" :class="{ collapsed }">
    <MarathonSidebar class="marathon-sidebar" :marathon-id="marathonId" :collapsed.sync="collapsed" />
    <NuxtChild class="marathon-view" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      marathonId: this.$route.params.marathon,
      // Show the sidebar by default on desktop-class devices
      collapsed: (globalThis.innerWidth ?? 1024) < 1024,
    };
  },
});
</script>

<style lang="scss" scoped>
  .marathon-container {
    width: 100%;
    display: flex;
    align-items: flex-start;
    align-items: start;
    gap: var(--spacing);
  }

  .marathon-sidebar {
    min-width: min(300px, 100%);
  }

  .marathon-view {
    width: 100%;
    flex-grow: 5;
  }

  @media (max-width: 1023px) {
    .marathon-container {
      flex-direction: column;
    }

    .marathon-sidebar {
      width: 100%;
    }
  }

  .collapsed {
    &.marathon-container {
      flex-direction: column;
    }

    .marathon-sidebar {
      width: 100%;
    }
  }
</style>
