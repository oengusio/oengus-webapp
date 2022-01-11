<template>
  <div v-if="shouldShowRedirectLinks" :class="{ collapsed }">
    <p class="menu-label">
      {{ $t('marathon.menu.admin') }}
    </p>
    <ul class="menu-list" :title="$t('marathon.menu.settings')">
      <li>
        <ElementLink :to="`/marathon/${marathonId}/settings`" class="menu-item-link">
          <FontAwesomeIcon class="menu-item-icon" :icon="[ 'fas', 'cogs' ]" />
          <span class="menu-item-label">
            {{ $t('marathon.menu.settings') }}
          </span>
        </ElementLink>
      </li>
      <li :title="$t('marathon.menu.selectRuns')">
        <ElementLink :to="`/marathon/${marathonId}/selection`" class="menu-item-link">
          <FontAwesomeIcon class="menu-item-icon" :icon="[ 'fas', 'check-square' ]" />
          <span class="menu-item-label">
            {{ $t('marathon.menu.selectRuns') }}
          </span>
        </ElementLink>
      </li>
      <li :title="$t('marathon.menu.manageSchedule')">
        <ElementLink :to="`/marathon/${marathonId}/schedule/manage`" class="menu-item-link">
          <FontAwesomeIcon class="menu-item-icon" :icon="[ 'fas', 'calendar-check' ]" />
          <span class="menu-item-label">
            {{ $t('marathon.menu.manageSchedule') }}
          </span>
        </ElementLink>
      </li>
      <li :title="$t('marathon.menu.manageIncentives')">
        <ElementLink :to="`/marathon/${marathonId}/incentives/manage`" class="menu-item-link">
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
  }
}
</style>
