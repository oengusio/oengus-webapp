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
  <!-- XXX @click.native will stop working in Vue v3+ (Vue Router v4+), but @click should start working -->
  <NuxtLink :to="path" :class="isActive" @click.native="navigate">
    <slot />
  </NuxtLink>
</template>

<script lang="ts">
import Vue from 'vue';
import { Location } from 'vue-router';
import { IsActive } from '~/types/components/is-active';

export default Vue.extend({
  props: {
    to: {
      type: [ String, Object ],
      default: '',
    },
    noActive: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    isActive(): IsActive {
      return {
        'is-active': !this.noActive && ((this.isHash ? this.$route.hash : this.$route.path) === this.path),
      };
    },
    path(): string|Location {
      return this.isHash ? this.to : this.localePath(this.to);
    },
    isHash(): boolean {
      return typeof this.to === 'string' ? this.to.startsWith('#') : true;
    },
  },

  methods: {
    /**
     * Works around a bug in Vue where anchor links don't work repeatedly.
     * This feature normally works in browsers, so people exepct it to work.
     */
    navigate(): void {
      if (this.isHash && this.path === this.$route.hash) {
        this.$scroll.toHash(this.path);
      }
    },
  },
});
</script>
