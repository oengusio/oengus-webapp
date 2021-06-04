<template>
  <div>
    <p>Oengus user profile page stub</p>
    <p>This is for user "{{user}}."</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  asyncData({ params }) {
    return {
      user: params.user,
    };
  },
});
</script>
