<template>
  <div :class="{ collapsed }">
    <p class="menu-label">
      {{ $t('marathon.menu.overview') }}
    </p>
    <ul class="menu-list">
      <li>
        <ElementLink :to="`/marathon/${marathonId}`">
          <FontAwesomeIcon class="menu-item-icon" :icon="[ 'fas', 'home' ]" />
          <span class="menu-item-label">
            {{ $t('marathon.menu.home') }}
          </span>
        </ElementLink>
      </li>
      <li>
        <ElementLink :to="`/marathon/${marathonId}/schedule`">
          <FontAwesomeIcon class="menu-item-icon" :icon="[ 'fas', 'calendar' ]" />
          <span class="menu-item-label">
            {{ $t('marathon.menu.schedule') }}
          </span>
        </ElementLink>
      </li>
      <li>
        <ElementLink :to="`/marathon/${marathonId}/submissions`">
          <FontAwesomeIcon class="menu-item-icon" :icon="[ 'fas', 'book' ]" />
          <span class="menu-item-label">
            {{ $t('marathon.menu.viewSubmissions') }}
          </span>
        </ElementLink>
      </li>
      <li v-if="shouldShowRedirectLinks">
        <ElementLink :to="`/marathon/${marathonId}/submit`">
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
  data() {
    return {
      shouldShowRedirectLinks: !this.$config.env.DOMAIN_V1,
    };
  },
});
</script>

<style lang="scss" scoped>
  .collapsed {
    .menu-label,
    .menu-item-label {
      display: none;
    }

    .menu-list {
      display: flex;
      flex-wrap: wrap;
    }
  }
</style>
