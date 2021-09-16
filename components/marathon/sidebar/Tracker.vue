<template>
  <div :class="{ collapsed }">
    <p class="menu-label">
      {{ $t('marathon.menu.tracker') }}
    </p>
    <ul class="menu-list">
      <li>
        <NuxtLink :to="localePath(`/marathon/${marathon.id}/donate`)">
          <FontAwesomeIcon class="menu-item-icon" :icon="[ 'fas', 'donate' ]" />
          <span class="menu-item-label">
            {{ $t('marathon.menu.donate') }}
          </span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink :to="localePath(`/marathon/${marathon.id}/donations`)">
          <FontAwesomeIcon class="menu-item-icon" :icon="[ 'fas', 'money-bill' ]" />
          <span class="menu-item-label">
            {{ $t('marathon.menu.donations') }}
          </span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink :to="localePath(`/marathon/${marathon.id}/incentives`)">
          <FontAwesomeIcon class="menu-item-icon" :icon="[ 'fas', 'bullseye' ]" />
          <span class="menu-item-label">
            {{ $t('marathon.menu.incentives') }}
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
