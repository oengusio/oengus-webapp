<template>
  <span v-if="marathon.onsite && marathon.country" class="icon flag-icon" :class="`flag-icon-${marathon.country.toLowerCase()}`" />
  <FontAwesomeIcon v-else :icon="[ 'fas', 'desktop' ]" class="icon" />
</template>

<script lang="ts">
import Vue from 'vue';
import { FullMarathon, Marathon } from '~/types/api/marathon';

export default Vue.extend({
  props: {
    marathon: {
      type: Object as () => Marathon|FullMarathon,
      default: undefined,
    },
  },
});
</script>

<style lang="scss" scoped>
.icon {
  display: flex;
  justify-content: center;
}
</style>
