<template>
  <ElementDropdown :type="type" :is-right="isRight">
    <template #trigger>
      {{ $t('navbar.login.title') }}
    </template>
    <template #options>
      <a :class="dropdownItemClass">
        <FontAwesomeIcon :icon="[ 'fab', 'discord' ]" class="icon" />
        <span>
          {{ $t('navbar.login.discord') }}
        </span>
      </a>
      <a :class="dropdownItemClass">
        <FontAwesomeIcon :icon="[ 'fab', 'twitch' ]" class="icon" />
        <span>
          {{ $t('navbar.login.twitch') }}
        </span>
      </a>
      <a :class="dropdownItemClass">
        <FontAwesomeIcon :icon="[ 'fab', 'twitter' ]" class="icon" />
        <span>
          {{ $t('navbar.login.twitter') }}
        </span>
      </a>
    </template>
  </ElementDropdown>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    /** 'DROPDOWN' or 'NAVBAR' indicating type, not case sensitive, optional defaults to 'DROPDOWN' */
    type: {
      type: String,
      default: 'DROPDOWN',
    },
    isRight: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dropdownItemClass: /^navbar$/i.test(this.type) ? 'navbar-item' : 'dropdown-item',
    };
  },
});
</script>

<style lang="scss" scoped>
  a.navbar-item,
  a.dropdown-item {
    display: flex;
    // Apparently `start` has bad coverage and Nuxt (or something) knows but it won't fix it automatically
    // The warning also doesn't seem to be able to tell that we've got a fallback value... *sigh*
    justify-content: flex-start;
    justify-content: start;

    > .icon {
      margin-right: 0.25em;
    }
  }
</style>
