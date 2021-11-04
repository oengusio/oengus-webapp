<template>
  <ElementTableRow>
    <ElementTableCell class="marathon">
      <ElementLink :to="`/marathon/${marathon.id}`">
        {{ marathon.name }}
      </ElementLink>
    </ElementTableCell>
    <ElementTableCell class="date">
      <ElementTemporalDateTime :datetime="marathon.startDate" format="mediumDateTime" />
      (<ElementTemporalDistance :datetime="marathon.startDate" />)
    </ElementTableCell>
  </ElementTableRow>
</template>

<script lang="ts">
import Vue from 'vue';
import { Marathon } from '~/types/api/marathon';

export default Vue.extend({
  props: {
    marathon: {
      type: Object as () => Marathon,
      default: undefined,
    },
  },
});
</script>
