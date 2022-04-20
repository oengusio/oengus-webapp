<template>
  <div>
    <div class="is-centered">
      <WidgetLoading :while="[ incentiveList ]" />
    </div>
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

      <template v-for="(incentive, index) of incentives">
        <MarathonIncentiveRow v-if="!incentive.toDelete" :key="incentive.id" :class="getRowParity(index)" :incentive="incentive" />
      </template>
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
  @include table.shrink($default-template-columns: 3);
}
</style>
