<template>
  <div class="navbar-item has-dropdown" :class="isActiveClass">
    <a class="navbar-link" @click="toggleActive">
      {{ $t('navbar.login.title') }}
    </a>
    <div class="navbar-dropdown is-right has-icons-left">
      <a class="navbar-item">
        <FontAwesomeIcon :icon="[ 'fab', 'discord' ]" class="icon" />
        <span>
          {{ $t('navbar.login.discord') }}
        </span>
      </a>
      <a class="navbar-item">
        <FontAwesomeIcon :icon="[ 'fab', 'twitch' ]" class="icon" />
        <span>
          {{ $t('navbar.login.twitch') }}
        </span>
      </a>
      <a class="navbar-item">
        <FontAwesomeIcon :icon="[ 'fab', 'twitter' ]" class="icon" />
        <span>
          {{ $t('navbar.login.twitter') }}
        </span>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { IsActive } from '~/types/components/is-active';

export default Vue.extend({
  data() {
    return {
      isActive: false,
    };
  },
  computed: {
    isActiveClass(): IsActive {
      return {
        'is-active': this.isActive,
      };
    },
  },
  methods: {
    toggleActive(): void {
      this.isActive = !this.isActive;
    },
  },
});
</script>

<style lang="scss" scoped>
  a.navbar-item {
    justify-content: start;

    > .icon {
      margin-right: 0.25em;
    }
  }
</style>
