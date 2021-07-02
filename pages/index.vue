<template>
  <div>
    <p>Oengus main page stub</p>
    <p>{{ $t('homepage.welcomeTitle') }}</p>
    <select @change="changeLocale">
      <option v-for="locale in locales" :key="locale.code" :value="locale.code" :selected="locale.code == currentLocale">
        {{ locale.code }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { LocaleObject } from 'nuxt-i18n';

export default Vue.extend({
  computed: {
    locales(): Array<LocaleObject|string> {
      return this.$i18n.locales;
    },
    currentLocale(): string {
      return this.$i18n.locale;
    },
  },
  methods: {
    changeLocale({ target }: { target: HTMLSelectElement }): void {
      this.$i18n.setLocale(target.value);
    },
  },
});
</script>
