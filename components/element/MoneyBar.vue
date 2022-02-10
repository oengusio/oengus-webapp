<template>
  <div class="money-bar">
    <i18n-n v-if="!hideValue" :value="value" :format="{ key: 'currency', currency: currency }" />
    <progress class="progress is-primary" :value="value" :max="max" />
    <i18n-n v-if="!hideMax" :value="max" :format="{ key: 'currency', currency: currency }" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    /** Progress towards the max */
    value: {
      type: Number,
      default: 0,
    },
    /** The capacity of the bar */
    max: {
      type: Number,
      default: 100,
    },
    /** Currency which should be used */
    currency: {
      type: String,
      default: 'EUR',
    },
    /** Show the value with text */
    hideValue: {
      type: Boolean,
      default: false,
    },
    /** Show the capacity with text */
    hideMax: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
.money-bar {
  display: flex;
  align-items: center;
  gap: calc(var(--spacing) / 2);
}

.progress {
  margin: 0;
}
</style>
