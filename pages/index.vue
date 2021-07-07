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
      <button @click="getUser(username)">
        Get User
      </button>
      <p>{{ user }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
/* eslint-disable-next-line import/named */ /* ESLint has trouble with this import... */
import { LocaleObject } from 'nuxt-i18n';
import { User, UserState } from '~/types/api/user';

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
    user(): User {
      return (this.$store.state.api.user as UserState).users[this.username];
    },
  },
  methods: {
    changeLocale({ target }: { target: HTMLSelectElement }): void {
      this.$i18n.setLocale(target.value);
    },
    ...mapActions({
      getUser: 'api/user/get',
    }),
  },
});
</script>
