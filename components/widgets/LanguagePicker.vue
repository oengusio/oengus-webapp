<template>
  <div>
    <select @change="changeLocaleSelect">
      <option v-for="locale in locales" :key="locale.code" :value="locale.code" :selected="locale.code == currentLocale.code">
        {{ locale.nativeName }}
      </option>
    </select>

    <div class="dropdown is-hoverable is-right">
      <div class="dropdown-trigger">
        <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
          {{ currentLocale.nativeName }}
        </button>
      </div>
      <div class="dropdown-menu" role="menu">
        <div class="dropdown-content">
          <a v-for="locale in locales" :key="locale.code" class="dropdown-item" @click="changeLocale(locale)">
            {{ locale.nativeName }}
          </a>
        </div>
      </div>
    </div>
  </div>
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
    currentLocale(): LocaleObject|undefined {
      return this.locales.find(locale => locale.code === this.$i18n.locale);
    },
  },
  methods: {
    changeLocaleSelect({ target }: { target: HTMLSelectElement }): void {
      this.$i18n.setLocale(target.value);
    },
    changeLocale(locale: LocaleObject): void {
      this.$i18n.setLocale(locale.code);
    },
  },
});
</script>
