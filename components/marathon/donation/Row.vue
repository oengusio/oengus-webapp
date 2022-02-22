<template>
  <ElementTableRow>
    <ElementTableCell class="date">
      <ElementTemporalDateTime :datetime="donation.date" format="mediumDateTime" />
    </ElementTableCell>
    <ElementTableCell class="name">
      {{ donation.nickname }}
    </ElementTableCell>
    <ElementTableCell class="amount">
      <i18n-n v-if="!hideValue" :value="donation.amount" :format="{ key: 'currency', currency: donationCurrency }" />
    </ElementTableCell>
    <ElementTableCell class="comment">
      <ElementMarkdown :markdown="donation.comment" />
    </ElementTableCell>
  </ElementTableRow>
</template>

<script lang="ts">
import Vue from 'vue';
import { Donation } from '~/types/api/donation';

export default Vue.extend({
  props: {
    donation: {
      type: Object as () => Donation,
      default: undefined,
    },
    donationCurrency: {
      type: String,
      default: 'EUR',
    },
  },
});
</script>
