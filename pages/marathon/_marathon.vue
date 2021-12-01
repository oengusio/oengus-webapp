<template>
  <div class="marathon-container" :class="{ collapsed }">
    <MarathonSidebar class="marathon-sidebar" :marathon-id="marathonId" :collapsed.sync="collapsed" />
    <NuxtChild class="marathon-view" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { MetaInfo } from 'vue-meta';
import { mapActions } from 'vuex';
import { FullMarathon, MarathonState } from '~/types/api/marathon';

export default Vue.extend({
  data() {
    return {
      marathonId: this.$route.params.marathon,
      // Show the sidebar by default on desktop-class devices
      collapsed: (globalThis.innerWidth ?? 1024) < 1024,
    };
  },

  async fetch(): Promise<void> {
    await Promise.allSettled([
      this.getMarathon(this.marathonId),
    ]);
  },

  head(): MetaInfo {
    // This isn't just a nicety, it tells Vue we depend on marathon, the function definition does not.
    // Without this, Vue doesn't know to recompute these values when marathon is fetched
    const marathon = this.marathon;
    return {
      titleTemplate: titleChunk => `${titleChunk ? `${titleChunk} | ` : ''}${marathon?.name ? `${marathon.name} | ` : ''}Oengus v2`,
    };
  },

  computed: {
    marathon(): FullMarathon|undefined {
      return (this.$store.state.api.marathon as MarathonState).marathons[this.marathonId];
    },
  },

  watch: {
    $route(to, from): void {
      // Detect when the path changes (not anchors in the same page or queries)
      if (to.path !== from.path) {
        // On mobile only, collapse the sidebar. This allows users to more easily observe the change
        if (globalThis.innerWidth < 1024) {
          this.collapsed = true;
        }
      }
    },
  },

  methods: {
    ...mapActions({
      getMarathon: 'api/marathon/get',
    }),
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
