<template>
  <div v-if="user && !user._fetching && user.connections.length" class="social-container">
    <UserSocialBox v-for="connection of user.connections" :key="connection.id" :connection="connection" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { User, UserState } from '~/types/api/user';

export default Vue.extend({
  props: {
    userId: {
      type: String,
      default: '',
    },
  },

  async fetch(): Promise<void> {
    await Promise.allSettled([
      this.getUser(this.userId),
    ]);
  },

  computed: {
    user(): User|undefined {
      return (this.$store.state.api.user as UserState).users[this.userId];
    },
  },

  methods: {
    ...mapActions({
      getUser: 'api/user/get',
    }),
  },
});
</script>

<style lang="scss" scoped>
.social-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  border-block: 1px solid;
}
</style>
