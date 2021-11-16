<template>
  <ElementTableRow>
    <ElementTableCell class="duration">
      Duration
    </ElementTableCell>
    <ElementTableCell class="name">
      <ElementLink :to="`/marathon/${marathon.id}`">
        {{ marathon.name }}
      </ElementLink>
    </ElementTableCell>
    <ElementTableCell class="links">
      <MarathonSidebarOverview :marathon-id="marathon.id" collapsed />
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
