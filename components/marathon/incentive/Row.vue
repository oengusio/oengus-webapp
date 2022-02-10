<template>
  <ElementTableRow>
    <ElementTableCell class="game">
      <span v-if="incentive.scheduleLine.gameName">
        {{ incentive.scheduleLine.gameName }}
      </span>
      <span v-if="incentive.scheduleLine.categoryName">
        {{ incentive.scheduleLine.categoryName }}
      </span>
      <span v-if="!incentive.scheduleLine.gameName && !incentive.scheduleLine.categoryName">
        -
      </span>
    </ElementTableCell>
    <ElementTableCell class="incentive">
      {{ incentive.name }}
    </ElementTableCell>
    <ElementTableCell class="description">
      {{ incentive.description }}
    </ElementTableCell>

    <!-- The second (and beyond) rows showing progress -->
    <ElementTableCell v-if="incentive.goal" column-start="1" column-end="-1" class="goal-progress">
      <ElementMoneyBar :value="incentive.currentAmount" :max="incentive.goal" :currency="incentive.currency" />
    </ElementTableCell>
    <template v-if="incentive.bidWar">
      <template v-for="bid of bids">
        <ElementTableCell :key="`name-${bid.id}`" class="bid-name">
          {{ bid.name }}
        </ElementTableCell>
        <ElementTableCell :key="`progress-${bid.id}`" class="bid-amount" column-end="span 2">
          <ElementMoneyBar :value="bid.currentAmount" :max="bidsTotal" :currency="incentive.currency" hide-max />
        </ElementTableCell>
      </template>
    </template>
  </ElementTableRow>
</template>

<script lang="ts">
import Vue from 'vue';
import { Incentive, IncentiveBid } from '~/types/api/incentive';

export default Vue.extend({
  props: {
    incentive: {
      type: Object as () => Incentive,
      default: undefined,
    },
  },

  computed: {
    bids(): Array<IncentiveBid> {
      if (!this.incentive.bidWar) {
        return [ ];
      }
      // Since we're not supposed to show certian bids and this makes them always be in the right order
      return this.incentive.bids
        .filter(bid => !bid.toDelete)
        .sort((bidA, bidB) => bidB.currentAmount - bidA.currentAmount);
    },
    bidsTotal(): number {
      return this.bids.reduce((total, bid) => total + bid.currentAmount, 0);
    },
  },
});
</script>

<style lang="scss" scoped>
.game > :not(:first-child)::before {
  content: '-';
}
</style>
