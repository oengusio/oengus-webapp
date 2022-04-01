<template>
  <span>
    <span>
      {{ console }}
    </span>
    <sup v-if="isEmulated">
      {{ $t('global.emu') }}
    </sup>
  </span>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    console: {
      type: String,
      default: '',
    },
    isEmulated: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
