<template>
  <div v-if="shouldShowRedirectLinks" :class="{ collapsed }">
    <p class="menu-label">
      {{ $t('marathon.menu.admin') }}
    </p>
    <ul class="menu-list">
      <li>
        <ElementLink :to="`/marathon/${marathonId}/settings`">
          <FontAwesomeIcon class="menu-item-icon" :icon="[ 'fas', 'cogs' ]" />
          <span class="menu-item-label">
            {{ $t('marathon.menu.settings') }}
          </span>
        </ElementLink>
      </li>
      <li>
        <ElementLink :to="`/marathon/${marathonId}/selection`">
          <FontAwesomeIcon class="menu-item-icon" :icon="[ 'fas', 'check-square' ]" />
          <span class="menu-item-label">
            {{ $t('marathon.menu.selectRuns') }}
          </span>
        </ElementLink>
      </li>
      <li>
        <ElementLink :to="`/marathon/${marathonId}/schedule/manage`">
          <FontAwesomeIcon class="menu-item-icon" :icon="[ 'fas', 'calendar-check' ]" />
          <span class="menu-item-label">
            {{ $t('marathon.menu.manageSchedule') }}
          </span>
        </ElementLink>
      </li>
      <li>
        <ElementLink :to="`/marathon/${marathonId}/incentives/manage`">
          <FontAwesomeIcon class="menu-item-icon" :icon="[ 'fas', 'dot-circle' ]" />
          <span class="menu-item-label">
            {{ $t('marathon.menu.manageIncentives') }}
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
