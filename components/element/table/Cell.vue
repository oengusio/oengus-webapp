<template>
  <div class="element-table-cell" :class="classes" :style="styles">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

interface CellClasses {
  'element-table-header': boolean;
}

interface CellStyles {
  '--column-start': string;
  '--column-end': string;
  '--row-start': string;
  '--row-end': string;
}

export default Vue.extend({
  props: {
    isHeader: {
      type: Boolean,
      default: false,
    },
    columnStart: {
      type: String,
      default: 'auto',
    },
    columnEnd: {
      type: String,
      default: 'auto',
    },
    rowStart: {
      type: String,
      default: 'auto',
    },
    rowEnd: {
      type: String,
      default: 'auto',
    },
  },

  computed: {
    classes(): CellClasses {
      return {
        'element-table-header': this.isHeader,
      };
    },
    styles(): CellStyles {
      return {
        '--column-start': this.columnStart,
        '--column-end': this.columnEnd,
        '--row-start': this.rowStart,
        '--row-end': this.rowEnd,
      };
    },
  },
});
</script>

<style lang="scss" scoped>
@use '~assets/table';

.element-table-cell {
  --column-start: auto;
  --column-end: auto;
  --row-start: auto;
  --row-end: auto;

  @include table.cell-like();
  @include table.cell-varients();

  grid-column-start: var(--column-start);
  grid-column-end: var(--column-end);
  grid-row-start: var(--row-start);
  grid-row-end: var(--row-end);
}

.element-table-header {
  font-weight: bold;
}
</style>
