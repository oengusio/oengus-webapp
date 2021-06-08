<template>
  <div>
    <p>Oengus marathon main page stub</p>
    <p>This is for marathon "{{ marathon }}."</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  asyncData({ params }) {
    return {
      marathon: params.marathon,
    };
  },
});
</script>
