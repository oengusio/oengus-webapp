<template>
  <div :class="{ collapsed }">
    <p class="menu-label">
      {{ $t('marathon.menu.overview') }}
    </p>
    <ul class="menu-list">
      <li>
        <NuxtLink :to="localePath(`/marathon/${marathon.id}`)">
          <FontAwesomeIcon class="menu-item-icon" :icon="[ 'fas', 'home' ]" />
          <span class="menu-item-label">
            {{ $t('marathon.menu.home') }}
          </span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink :to="localePath(`/marathon/${marathon.id}/schedule`)">
          <FontAwesomeIcon class="menu-item-icon" :icon="[ 'fas', 'calendar' ]" />
          <span class="menu-item-label">
            {{ $t('marathon.menu.schedule') }}
          </span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink :to="localePath(`/marathon/${marathon.id}/submissions`)">
          <FontAwesomeIcon class="menu-item-icon" :icon="[ 'fas', 'book' ]" />
          <span class="menu-item-label">
            {{ $t('marathon.menu.viewSubmissions') }}
          </span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink :to="localePath(`/marathon/${marathon.id}/submit`)">
          <FontAwesomeIcon class="menu-item-icon" :icon="[ 'fas', 'paper-plane' ]" />
          <span class="menu-item-label">
            {{ $t('marathon.menu.submitRuns') }}
          </span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { FullMarathon } from '~/types/api/marathon';

export default Vue.extend({
  props: {
    marathon: {
      type: Object as () => FullMarathon,
      default: () => {},
    },
    collapsed: {
      type: Boolean,
      default: false,
    },
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
