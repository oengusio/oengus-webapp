<template>
  <div>
    <WidgetLoading :while="[ incentiveList ]" />
    <ElementTable v-show="incentives" class="incentives-table">
      <ElementTableCell is-header class="game">
        {{ $t('marathon.incentives.management.table.game') }}
      </ElementTableCell>
      <ElementTableCell is-header class="incentive">
        {{ $t('marathon.incentives.management.table.incentive') }}
      </ElementTableCell>
      <ElementTableCell is-header class="description">
        {{ $t('marathon.incentives.management.table.description') }}
      </ElementTableCell>
      <ElementTableCell is-header class="goal-progress">
        {{ $t('marathon.incentives.management.table.progress') }}
      </ElementTableCell>

      <MarathonIncentiveRow v-for="(incentive, index) of incentives" :key="incentive.id" :class="getRowParity(index)" :incentive="incentive" />
    </ElementTable>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { Incentive, IncentiveList, IncentiveState } from '~/types/api/incentive';

export default Vue.extend({
  props: {
    marathonId: {
      type: String,
      default: '',
    },
  },

  async fetch(): Promise<void> {
    await Promise.allSettled([
      this.getIncentives(this.marathonId),
    ]);
  },

  computed: {
    incentiveList(): IncentiveList|undefined {
      return (this.$store.state.api.incentive as IncentiveState).incentives[this.marathonId];
    },
    incentives(): Array<Incentive>|undefined {
      return this.incentiveList?.incentives;
    },
  },

  methods: {
    getRowParity(index: number): { 'is-even': boolean, 'is-odd': boolean } {
      return {
        'is-even': index % 2 === 0,
        'is-odd': index % 2 === 1,
      };
    },
    ...mapActions({
      getIncentives: 'api/incentive/get',
    }),
  },
});
</script>

<style lang="scss" scoped>
@use '~assets/table';

.incentives-table {
  @include table.shrink(4, ());
}
</style>
