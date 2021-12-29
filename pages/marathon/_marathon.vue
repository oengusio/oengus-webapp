<template>
  <div class="marathon-container" :class="{ collapsed }">
    <MarathonHeader class="marathon-header" :marathon-id="marathonId" :collapsed.sync="collapsed" />
    <MarathonSidebar v-show="!collapsed" class="marathon-sidebar" :marathon-id="marathonId" :collapsed.sync="collapsed" />
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
      collapsed: false,
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

  mounted(): void {
    // Show the sidebar by default on desktop-class devices
    this.collapsed = (globalThis.innerWidth ?? 1024) < 1024;
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
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'sidebar header'
    'sidebar view';
  gap: var(--spacing);
}

.marathon-header {
  grid-area: header;
}

.marathon-sidebar {
  grid-area: sidebar;
  align-self: start;
  min-width: min(300px, 100%);
}

.marathon-view {
  grid-area: view;
  width: 100%;
  flex-grow: 5;
}

@media (max-width: 1023px) {
  .marathon-container {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto 1fr;
    grid-template-areas:
      'header'
      'sidebar'
      'view';
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
