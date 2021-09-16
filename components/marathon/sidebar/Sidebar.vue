<template>
  <nav class="menu box" :class="{ collapsed }">
    <div class="sidebar-header">
      <h3 class="title is-3">
        {{ marathon ? marathon.name : marathonId }}
      </h3>
      <button class="button navbar-burger" :class="isActiveClass" @click="toggleSidebar">
        <span />
        <span />
        <span />
      </button>
    </div>

    <div v-if="marathon" class="menu-sections">
      <MarathonSidebarOverview :marathon="marathon" :collapsed="collapsed" class="menu-section" />
      <MarathonSidebarTracker :marathon="marathon" :collapsed="collapsed" class="menu-section" />
      <MarathonSidebarAdmin :marathon="marathon" :collapsed="collapsed" class="menu-section" />
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { FullMarathon, MarathonState } from '~/types/api/marathon';
import { IsActive } from '~/types/components/is-active';

export default Vue.extend({
  props: {
    marathonId: {
      type: String,
      default: '',
    },
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
  async fetch(): Promise<void> {
    await Promise.allSettled([
      this.getMarathon(this.marathonId),
    ]);
  },
  computed: {
    marathon(): FullMarathon|undefined {
      return (this.$store.state.api.marathon as MarathonState).marathons[this.marathonId];
    },
    isActiveClass(): IsActive {
      return {
        'is-active': !this.collapsed,
      };
    },
  },
  methods: {
    toggleSidebar(): void {
      this.$emit('update:collapsed', !this.collapsed);
    },
    ...mapActions({
      getMarathon: 'api/marathon/get',
    }),
  },
});
</script>

<style lang="scss" scoped>
  .sidebar-header {
    display: grid;
    grid-template-columns: auto min-content;
    column-gap: var(--spacing);

    // Force this element to always display, Bulma wants to hide it by default
    @media (min-width: 1024px) {
      .navbar-burger {
        display: block;
      }
    }
  }

  // This mimicks the Bulma styling, but with our components
  .menu:not(.collapsed) .menu-section:not(:first-child) {
    margin-block-start: 1em;
  }

  .collapsed {
    .menu-sections {
      display: flex;
      flex-wrap: wrap;
    }
  }
</style>
