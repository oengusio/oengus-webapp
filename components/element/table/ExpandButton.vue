<template>
  <ElementTableCell class="element-table-expand-button">
    <FontAwesomeIcon :icon="[ 'fas', isExpanded ? 'caret-down' : 'caret-right' ]" />
  </ElementTableCell>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    isExpanded: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
.element-table-expand-button > svg {
  width: 10px;
  max-width: 10px;
}
</style>
