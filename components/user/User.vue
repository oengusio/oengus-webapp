<template>
  <div>
    <!-- eslint-disable-next-line vue/singleline-html-element-content-newline -->
    <ElementLink v-if="isLink" :to="`/user/${userId}`">{{ displayName }}</ElementLink>
    <span v-else>{{ displayName }}</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { User } from '~/types/api/user';

export default Vue.extend({
  props: {
    user: {
      type: Object as () => User,
      default: undefined,
    },
    username: {
      type: String,
      default: '',
    },
    isLink: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    userId(): string {
      return this.user?.username ?? this.user;
    },
    displayName(): string {
      if (this.user?.usernameJapanese && this.$i18n.locale.startsWith('ja')) {
        return this.user.usernameJapanese;
      }
      return this.userId;
    },
  },
});
</script>
