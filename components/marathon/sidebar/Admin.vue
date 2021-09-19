<template>
  <div v-if="shouldShowRedirectLinks" :class="{ collapsed }">
    <p class="menu-label">
      {{ $t('marathon.menu.admin') }}
    </p>
    <ul class="menu-list">
      <li>
        <NuxtLink :to="localePath(`/marathon/${marathonId}/settings`)">
          <FontAwesomeIcon class="menu-item-icon" :icon="[ 'fas', 'cogs' ]" />
          <span class="menu-item-label">
            {{ $t('marathon.menu.settings') }}
          </span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink :to="localePath(`/marathon/${marathonId}/selection`)">
          <FontAwesomeIcon class="menu-item-icon" :icon="[ 'fas', 'check-square' ]" />
          <span class="menu-item-label">
            {{ $t('marathon.menu.selectRuns') }}
          </span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink :to="localePath(`/marathon/${marathonId}/schedule/manage`)">
          <FontAwesomeIcon class="menu-item-icon" :icon="[ 'fas', 'calendar-check' ]" />
          <span class="menu-item-label">
            {{ $t('marathon.menu.manageSchedule') }}
          </span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink :to="localePath(`/marathon/${marathonId}/incentives/manage`)">
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
      shouldShowRedirectLinks: !process.env.DOMAIN_V1,
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
