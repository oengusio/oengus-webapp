<template>
  <div class="element-table" :style="styles">
    <slot name="pagination" />
    <slot name="header" />
    <slot />
    <slot name="pagination" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

interface TableStyles {
  '--border-width': string;
}

export default Vue.extend({
  props: {
    isDivided: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    styles(): TableStyles {
      return {
        '--border-width': this.isDivided ? '1px' : '0',
      };
    },
  },
});
</script>

<style lang="scss" scoped>
.element-table {
  --border-width: 0;

  display: grid;
  grid-auto-rows: auto;
  width: 100%;
  max-width: 100%;

  .element-table-cell {
    border-block-end: var(--border-width) solid;
  }

  .element-table-header {
    border-block-end: calc(2 * var(--border-width)) solid;
  }
}

::v-deep .element-table-paginator {
  &:first-of-type {
    margin-block-end: var(--spacing);
  }

  &:last-of-type {
    margin-block-start: var(--spacing);
  }
}
</style>
