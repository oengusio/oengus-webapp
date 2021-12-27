<template>
  <div class="marathon-sidebar-overview-container" :class="{ collapsed }">
    <p class="menu-label">
      {{ $t('marathon.menu.overview') }}
    </p>
    <ul class="menu-list">
      <li :title="$t('marathon.menu.home')">
        <ElementLink :to="`/marathon/${marathonId}`" class="menu-item-link">
          <FontAwesomeIcon class="menu-item-icon" :class="{ 'fa-lg': isBigHome }" :icon="[ 'fas', 'home' ]" />
          <span class="menu-item-label">
            {{ $t('marathon.menu.home') }}
          </span>
        </ElementLink>
      </li>
      <li v-if="marathon.scheduleDone" :title="$t('marathon.menu.schedule')">
        <ElementLink :to="`/marathon/${marathonId}/schedule`" class="menu-item-link">
          <FontAwesomeIcon class="menu-item-icon" :icon="[ 'fas', 'calendar' ]" />
          <span class="menu-item-label">
            {{ $t('marathon.menu.schedule') }}
          </span>
        </ElementLink>
      </li>
      <li :title="$t('marathon.menu.viewSubmissions')">
        <ElementLink :to="`/marathon/${marathonId}/submissions`" class="menu-item-link">
          <FontAwesomeIcon class="menu-item-icon" :icon="[ 'fas', 'book' ]" />
          <span class="menu-item-label">
            {{ $t('marathon.menu.viewSubmissions') }}
          </span>
        </ElementLink>
      </li>
      <li v-if="shouldShowRedirectLinks" :title="$t('marathon.menu.submitRuns')">
        <ElementLink :to="`/marathon/${marathonId}/submit`" class="menu-item-link">
          <FontAwesomeIcon class="menu-item-icon" :icon="[ 'fas', 'paper-plane' ]" />
          <span class="menu-item-label">
            {{ $t('marathon.menu.submitRuns') }}
          </span>
        </ElementLink>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { FullMarathon, MarathonState } from '~/types/api/marathon';

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
    isBigHome: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      shouldShowRedirectLinks: !this.$config.env.DOMAIN_V1,
    };
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
  },

  methods: {
    ...mapActions({
      getMarathon: 'api/marathon/get',
    }),
  },
});
</script>

<style lang="scss" scoped>
.menu-item-link {
  display: flex;
  justify-content: flex-start;
  justify-content: start;
  align-items: center;
}

.menu-item-icon {
  min-width: 1.5em;
  margin-inline-end: 0.25em;
}

.collapsed {
  .menu-label,
  .menu-item-label {
    display: none;
  }

  .menu-item-icon {
    margin-inline-end: 0;
  }

  .menu-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
}
</style>
