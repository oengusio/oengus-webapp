<template>
  <div class="element-table">
    <slot name="header" />
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.element-table {
  display: grid;
  grid-auto-rows: auto;
  width: 100%;
  max-width: 100%;
}
</style>
