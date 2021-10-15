<template>
  <div v-if="shouldShowRedirectLinks" :class="{ collapsed }">
    <p class="menu-label">
      {{ $t('marathon.menu.tracker') }}
    </p>
    <ul class="menu-list">
      <li>
        <ElementLink :to="`/marathon/${marathonId}/donate`" class="menu-item-link">
          <FontAwesomeIcon class="menu-item-icon" :icon="[ 'fas', 'donate' ]" />
          <span class="menu-item-label">
            {{ $t('marathon.menu.donate') }}
          </span>
        </ElementLink>
      </li>
      <li>
        <ElementLink :to="`/marathon/${marathonId}/donations`" class="menu-item-link">
          <FontAwesomeIcon class="menu-item-icon" :icon="[ 'fas', 'money-bill' ]" />
          <span class="menu-item-label">
            {{ $t('marathon.menu.donations') }}
          </span>
        </ElementLink>
      </li>
      <li>
        <ElementLink :to="`/marathon/${marathonId}/incentives`" class="menu-item-link">
          <FontAwesomeIcon class="menu-item-icon" :icon="[ 'fas', 'bullseye' ]" />
          <span class="menu-item-label">
            {{ $t('marathon.menu.incentives') }}
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
