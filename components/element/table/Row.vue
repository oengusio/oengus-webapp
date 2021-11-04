<template>
  <div class="element-table-row">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@use '~assets/table';

.element-table-row {
  @include table.cell-varients($selector-after: '::v-deep > .element-table-cell');

  // XXX display: contents should be a hack and an implementation detail and is subject to change
  // This is a substitute for properly using subgrid (CSS Grid Level 2)
  display: contents;
}
</style>
