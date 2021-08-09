<template>
  <ElementDropdown type="navbar" is-right>
    <template #trigger>
      {{ currentLocale.nativeName }}
    </template>
    <template #options>
      <a v-for="locale in locales" :key="locale.code" class="navbar-item" @click="changeLocale(locale)">
        {{ locale.nativeName }}
      </a>
    </template>
  </ElementDropdown>
</template>

<script lang="ts">
import Vue from 'vue';
/* eslint-disable-next-line import/named */ /* ESLint has trouble with this import... */
import { LocaleObject } from 'nuxt-i18n';

export default Vue.extend({
  data() {
    return {
      locales: this.$i18n.locales as Array<LocaleObject>,
    };
  },
  computed: {
    currentLocale(): LocaleObject {
      // While .find() can normally return undefined, it shouldn't be possible here, so assert found
      return this.locales.find(locale => locale.code === this.$i18n.locale)!;
    },
  },
  methods: {
    changeLocale(locale: LocaleObject): void {
      this.$i18n.setLocale(locale.code);
    },
  },
});
</script>
