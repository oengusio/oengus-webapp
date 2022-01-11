<template>
  <nav class="menu box" :class="{ collapsed }">
    <button class="button navbar-burger" :class="isActiveClass" @click="toggleSidebar">
      <span />
      <span />
      <span />
    </button>

    <div class="menu-sections">
      <MarathonSidebarOverview :marathon-id="marathonId" :collapsed="collapsed" class="menu-section" />
      <MarathonSidebarTracker :marathon-id="marathonId" :collapsed="collapsed" class="menu-section" />
      <MarathonSidebarAdmin :marathon-id="marathonId" :collapsed="collapsed" class="menu-section" />
      <hr v-show="!collapsed">
      <MarathonSidebarModerators :marathon-id="marathonId" :collapsed="collapsed" class="menu-section" />
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue';
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

  computed: {
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
  },
});
</script>

<style lang="scss" scoped>
// Force this element to always display, Bulma wants to hide it by default
@media (min-width: 1024px) {
  .navbar-burger {
    display: block;
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

.box {
  margin: 0;
}
</style>
