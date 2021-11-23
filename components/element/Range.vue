<template>
  <div class="element-range" :style="rangeCutoffs">
    <div class="selected-range" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    start: {
      type: Number,
      default: 0,
    },
    end: {
      type: Number,
      default: 0,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 1,
    },
  },

  computed: {
    rangeCutoffs(): { '--start-range': string, '--end-range': string } {
      return {
        '--start-range': `${100 * (this.start - this.min) / (this.max - this.min)}%`,
        '--end-range': `${100 * (this.max - this.end) / (this.max - this.min)}%`,
      };
    },
  },
});
</script>

<style lang="scss" scoped>
@use '~bulmaswatch/solar/variables' as solar;
@use '~bulma/sass/utilities/initial-variables' as bulma;

.element-range {
  --start-range: 0%;
  --end-range: 100%;

  position: relative;
  border: none;
  border-radius: bulma.$radius-rounded;
  display: block;
  height: 1rem;
  overflow: hidden;
  padding: 0;
  width: 100%;
  background-color: bulma.$grey-lightest;

  .selected-range {
    position: absolute;
    border: none;
    border-radius: bulma.$radius-rounded;
    display: block;
    height: 100%;
    overflow: hidden;
    left: var(--start-range);
    right: var(--end-range);
    // TODO Make with the colors
    background-color: solar.$primary;
  }
}
</style>
