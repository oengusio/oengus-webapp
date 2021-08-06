<template>
  <div class="navbar-item has-dropdown" :class="isActiveClass">
    <a class="navbar-link" @click="toggleActive">
      {{ currentLocale.nativeName }}
    </a>
    <div class="navbar-dropdown is-right">
      <a v-for="locale in locales" :key="locale.code" class="navbar-item" @click="changeLocale(locale)">
        {{ locale.nativeName }}
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
/* eslint-disable-next-line import/named */ /* ESLint has trouble with this import... */
import { LocaleObject } from 'nuxt-i18n';
import { IsActive } from '~/types/components/is-active';

export default Vue.extend({
  data() {
    return {
      locales: this.$i18n.locales as Array<LocaleObject>,
      isActive: false,
    };
  },
  computed: {
    currentLocale(): LocaleObject {
      // While .find() can normally return undefined, it shouldn't be possible here, so assert found
      return this.locales.find(locale => locale.code === this.$i18n.locale)!;
    },
    isActiveClass(): IsActive {
      return {
        'is-active': this.isActive,
      };
    },
  },
  methods: {
    changeLocale(locale: LocaleObject): void {
      this.$i18n.setLocale(locale.code);
      this.isActive = false;
    },
    toggleActive(): void {
      this.isActive = !this.isActive;
    },
  },
});
</script>
