<template>
  <div class="element-table-detail-container">
    <div class="element-table-detail">
      <slot class="test-class" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '~assets/table';
@use '~assets/themes/default' as theme;

.element-table-detail-container {
  @include table.cell-varients($selector-after: '> .element-table-detail');

  // Span from start to finish
  grid-column: 1 / -1;
  // Needed to allow the proper placement of the before and after
  position: relative;
  padding-inline-start: var(--spacing);
  padding-block: calc(var(--spacing) / 2);

  // Provides the strokes for the L connecting the entry to the detail
  &::before {
    content: '';
    position: absolute;
    inset-block-start: var(--spacing);
    inset-inline-start: calc(var(--spacing) / 2);
    width: calc(var(--spacing) / 2);
    height: 2px;
    background-color: #666;
  }

  &::after {
    content: '';
    position: absolute;
    inset-block-start: 0;
    inset-inline-start: calc(var(--spacing) / 2);
    height: var(--spacing);
    width: 2px;
    background-color: #666;
  }

  > .element-table-detail {
    padding: var(--spacing);
    border-radius: theme.$radius;

    @media (max-width: 1023px) {
      & {
        padding: calc(var(--spacing) / 2);
      }
    }
  }
}
</style>
