<template>
  <div>
    <UserProfile :user-id="userId" />
    <UserSocial :user-id="userId" />
    <UserHistory :user-id="userId" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { MetaInfo } from 'vue-meta';

export default Vue.extend({
  data() {
    return {
      userId: this.$route.params.user,
    };
  },

  head(): MetaInfo {
    return {
      title: this.$route.params.user,
    };
  },
});
</script>
