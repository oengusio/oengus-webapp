<template>
  <div>
    <div class="is-centered">
      <WidgetLoading :while="[ donationsPage ]" />
    </div>
    <ElementTable v-show="donations" class="donations-table">
      <ElementTableCell is-header class="date">
        {{ $t('marathon.donations.table.date') }}
      </ElementTableCell>
      <ElementTableCell is-header class="name">
        {{ $t('marathon.donations.table.name') }}
      </ElementTableCell>
      <ElementTableCell is-header class="amount">
        {{ $t('marathon.donations.table.amount') }}
      </ElementTableCell>
      <ElementTableCell is-header class="comment">
        {{ $t('marathon.donations.table.comment') }}
      </ElementTableCell>

      <MarathonDonationRow v-for="(donation, index) of donations" :key="donation.id" :class="getRowParity(index)" :donation="donation" :donation-currency="donationCurrency" />

      <template #pagination>
        <ElementTablePaginator :page-data="donationsPage" page-change-path-template="?donations-page={}" />
      </template>
    </ElementTable>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { getRowParity } from '~/assets/table';
import { Donation, DonationPageParams, DonationState } from '~/types/api/donation';
import { FullMarathon, MarathonState } from '~/types/api/marathon';
import { OengusPagination } from '~/types/api/oengus-api';

export default Vue.extend({
  props: {
    marathonId: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      page: 0,
      pageSize: 25,
    };
  },

  async fetch(): Promise<void> {
    await Promise.allSettled([
      this.getDonations(this.donationParams),
      this.getMarathon(this.marathonId),
    ]);
  },

  computed: {
    donationsPage(): OengusPagination<Donation>|undefined {
      return (this.$store.state.api.donation as DonationState).donations[`${this.marathonId}-${this.page}-${this.pageSize}`];
    },
    donations(): Array<Donation>|undefined {
      return this.donationsPage?.content;
    },
    donationParams(): { id: string, data: DonationPageParams } {
      return {
        id: this.marathonId,
        data: {
          page: this.page ?? 0,
          size: this.pageSize ?? 25,
        },
      };
    },
    marathon(): FullMarathon|undefined {
      return (this.$store.state.api.marathon as MarathonState).marathons[this.marathonId];
    },
    donationCurrency(): string|undefined {
      return this.marathon?.donationCurrency;
    },
  },

  watch: {
    $route(): void {
      this.updatePage();
    },
    page(newPage, oldPage): void {
      if (newPage !== oldPage) {
        this.$fetch();
      }
    },
  },

  mounted(): void {
    this.updatePage();
  },

  methods: {
    updatePage(): void {
      if (typeof this.$route.query['donations-page'] === 'string') {
        // Convert from 1-indexed to 0-indexed
        this.page = Number.parseInt(this.$route.query['donations-page']) - 1;
      }
    },
    getRowParity,
    ...mapActions({
      getDonations: 'api/donation/get',
      getMarathon: 'api/marathon/get',
    }),
  },
});
</script>

<style lang="scss" scoped>
@use '~assets/table';

.donations-table {
  @include table.shrink($default-template-columns: 4, $shrinking-rules: (
    600px '.date' 3,
    500px null (1fr auto 2fr),
  ));

  & ::v-deep .name,
  & ::v-deep .comment {
    overflow-x: auto;
  }
}
</style>
