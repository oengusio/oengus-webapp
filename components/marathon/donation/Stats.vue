<template>
  <div class="donation-stats-overview">
    <div class="info-box">
      <p class="info-label">
        {{ $t('marathon.donations.total') }}
      </p>
      <p class="info">
        <i18n-n :value="stats.total" :format="{ key: 'currency', currency: donationCurrency }" />
      </p>
    </div>
    <div class="info-box">
      <p class="info-label">
        {{ $t('marathon.donations.count') }}
      </p>
      <p class="info">
        <i18n-n :value="stats.count" :format="{ key: 'currency', currency: donationCurrency }" />
      </p>
    </div>
    <div class="info-box">
      <p class="info-label">
        {{ $t('marathon.donations.average') }}
      </p>
      <p class="info">
        <i18n-n :value="stats.average" :format="{ key: 'currency', currency: donationCurrency }" />
      </p>
    </div>
    <div class="info-box">
      <p class="info-label">
        {{ $t('marathon.donations.max') }}
      </p>
      <p class="info">
        <i18n-n :value="stats.max" :format="{ key: 'currency', currency: donationCurrency }" />
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { DonationState, DonationStats } from '~/types/api/donation';
import { FullMarathon, MarathonState } from '~/types/api/marathon';

export default Vue.extend({
  props: {
    marathonId: {
      type: String,
      default: '',
    },
  },

  async fetch(): Promise<void> {
    await Promise.allSettled([
      this.getStats(this.marathonId),
      this.getMarathon(this.marathonId),
    ]);
  },

  computed: {
    stats(): DonationStats|undefined {
      return (this.$store.state.api.donation as DonationState).stats[this.marathonId];
    },
    marathon(): FullMarathon|undefined {
      return (this.$store.state.api.marathon as MarathonState).marathons[this.marathonId];
    },
    donationCurrency(): string|undefined {
      return this.marathon?.donationCurrency;
    },
  },

  methods: {
    ...mapActions({
      getStats: 'api/donation/stats',
      getMarathon: 'api/marathon/get',
    }),
  },
});
</script>

<style lang="scss" scoped>
.donation-stats-overview {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: var(--spacing);
  padding: var(--spacing);
  border-block: 1px solid;

  > .info-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;

    .info {
      font-size: 1.75rem;
      line-height: 1;
    }
  }
}
</style>
