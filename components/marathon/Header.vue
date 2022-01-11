<template>
  <div class="box marathon-header-container">
    <div class="main-header">
      <h3 class="title is-3">
        {{ marathonName }}
      </h3>
      <button v-show="collapsed" class="button navbar-burger" :class="buttonClass" @click="toggleSidebar">
        <span />
        <span />
        <span />
      </button>
    </div>

    <div v-show="collapsed" class="menu-sections">
      <MarathonSidebarOverview :marathon-id="marathonId" collapsed />
      <MarathonSidebarTracker :marathon-id="marathonId" collapsed />
      <MarathonSidebarAdmin :marathon-id="marathonId" collapsed />
    </div>
  </div>
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
      default: true,
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
    marathonName(): string {
      let marathonName = '';
      if (this.marathon) {
        marathonName = this.marathon.name;
      }
      if (!marathonName && this.marathonId) {
        const frontPage = (this.$store.state.api.marathon as MarathonState).frontPage;
        if (frontPage) {
          marathonName = [ ...frontPage.live, ...frontPage.next, ...frontPage.open ].find(marathon => marathon.id === this.marathonId)?.name ?? marathonName;
        }
      }
      return marathonName;
    },
    buttonClass(): IsActive {
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
.marathon-header-container {
  margin: 0;
}

.main-header {
  display: grid;
  grid-template-columns: auto min-content;
  column-gap: var(--spacing);

  .title {
    margin: 0;
  }

  // Force this element to always display, Bulma wants to hide it by default
  @media (min-width: 1024px) {
    .navbar-burger {
      display: block;
    }
  }
}

.menu-sections {
  display: flex;
  flex-wrap: wrap;
  padding-block-start: var(--spacing);
}
</style>
