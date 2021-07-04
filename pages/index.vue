<template>
  <div>
    <p>Oengus main page stub</p>
    <p>{{ $t('homepage.welcomeTitle') }}</p>
    <select @change="changeLocale">
      <option v-for="locale in locales" :key="locale.code" :value="locale.code" :selected="locale.code == currentLocale">
        {{ locale.code }}
      </option>
    </select>
    <div>
      <input v-model="username">
      <button @click="getUserExists(username)">
        Get User
      </button>
      <p>{{ exists }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
/* eslint-disable-next-line import/named */ /* ESLint has trouble with this import... */
import { LocaleObject } from 'nuxt-i18n';

export default Vue.extend({
  data() {
    return {
      username: '',
    };
  },
  computed: {
    locales(): Array<LocaleObject> {
      return this.$i18n.locales as Array<LocaleObject>;
    },
    currentLocale(): string {
      return this.$i18n.locale;
    },
    exists(): string {
      return this.$store.state.api.user.exists[this.username] ? 'True' : 'False';
    },
  },
  methods: {
    changeLocale({ target }: { target: HTMLSelectElement }): void {
      this.$i18n.setLocale(target.value);
    },
    ...mapActions({
      getUserExists: 'api/user/exists',
    }),
  },
});
</script>
