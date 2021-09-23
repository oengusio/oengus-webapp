<!--
This is a custom linker to deal with a deficit in the Vue Router linking system
Route matching only occur as route.startsWith(link) or route === link, neither of
which work correctly universally. This will apparently be addressed more generally
in the future.
See: https://github.com/vuejs/rfcs/pull/136
See also: https://github.com/vuejs/vue-router/issues/2040

This is also somewhat nice to centralize the localePath logic, so we don't have
to type it absolutely everywhere.
-->

<template>
  <NuxtLink :to="path" :class="isActive">
    <slot />
  </NuxtLink>
</template>

<script lang="ts">
import Vue from 'vue';
import { IsActive } from '~/types/components/is-active';

export default Vue.extend({
  props: {
    to: {
      type: String,
      default: '',
    },
  },
  computed: {
    isActive(): IsActive {
      return {
        'is-active': this.$route.path === this.path,
      };
    },
    path(): string {
      return this.localePath(this.to);
    },
  },
});
</script>
