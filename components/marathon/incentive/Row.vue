<template>
  <ElementTableRow>
    <ElementTableCell class="game">
      {{ incentive.scheduleLine.gameName }}
    </ElementTableCell>
    <ElementTableCell class="incentive">
      {{ incentive.name }}
    </ElementTableCell>
    <ElementTableCell class="description">
      {{ incentive.description }}
    </ElementTableCell>
    <ElementTableCell class="goal-progress">
      <template v-if="incentive.goal">
        <span>{{ incentive.currentAmount }} of {{ incentive.goal }}</span>
      </template>
    </ElementTableCell>
  </ElementTableRow>
</template>

<script lang="ts">
import Vue from 'vue';
import { Incentive } from '~/types/api/incentive';

export default Vue.extend({
  props: {
    incentive: {
      type: Object as () => Incentive,
      default: undefined,
    },
  },
});
</script>
