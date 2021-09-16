<template>
  <div :class="{ collapsed }">
    <p class="menu-label">
      {{ $t('marathon.menu.admin') }}
    </p>
    <ul class="menu-list">
      <li>
        <NuxtLink :to="localePath(`/marathon/${marathon.id}/settings`)">
          <FontAwesomeIcon class="menu-item-icon" :icon="[ 'fas', 'cogs' ]" />
          <span class="menu-item-label">
            {{ $t('marathon.menu.settings') }}
          </span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink :to="localePath(`/marathon/${marathon.id}/selection`)">
          <FontAwesomeIcon class="menu-item-icon" :icon="[ 'fas', 'check-square' ]" />
          <span class="menu-item-label">
            {{ $t('marathon.menu.selectRuns') }}
          </span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink :to="localePath(`/marathon/${marathon.id}/schedule/manage`)">
          <FontAwesomeIcon class="menu-item-icon" :icon="[ 'fas', 'calendar-check' ]" />
          <span class="menu-item-label">
            {{ $t('marathon.menu.manageSchedule') }}
          </span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink :to="localePath(`/marathon/${marathon.id}/incentives/manage`)">
          <FontAwesomeIcon class="menu-item-icon" :icon="[ 'fas', 'dot-circle' ]" />
          <span class="menu-item-label">
            {{ $t('marathon.menu.manageIncentives') }}
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
