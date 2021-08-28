<template>
  <div>
    <p>Oengus main page stub</p>
    <p>{{ $t('homepage.welcomeTitle') }}</p>
    <div>
      <input v-model="username">
      <button @click="getUser(username)">
        Get User
      </button>
      <p>{{ user }}</p>
    </div>
    <div>
      {{ time }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { User, UserState } from '~/types/api/user';

export default Vue.extend({
  data() {
    return {
      username: '',
      time: (new Date()).toString(),
    };
  },
  computed: {
    user(): User {
      return (this.$store.state.api.user as UserState).users[this.username];
    },
  },
  methods: {
    ...mapActions({
      getUser: 'api/user/get',
    }),
  },
});
</script>
