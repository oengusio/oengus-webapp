<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <p>
        {{ $t('footer.text', { timezone: $temporal.timeZone.timeZone }) }}
      </p>
      <p v-html="$t('footer.donate', { donationLink: 'https://www.patreon.com/oengusio' })" />
      <p>
        &copy; {{ thisYear }}
        <a href="https://esamarathon.com/">
          European Speedrunner Assembly AB
        </a>
      </p>
      <NuxtLink v-if="shouldShowRedirectLink" :to="localePath(`${$route.path}/v1`)" class="button is-warning">
        {{ $t('footer.v1Link') }}
      </NuxtLink>
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      thisYear: new Date().getFullYear(),
      shouldShowRedirectLink: process.env.DOMAIN_V1,
    };
  },
});
</script>

<style lang="scss" scoped>
  .footer {
    padding-block-end: 4rem;
  }
</style>

<!-- Temporary language info to avoid having the i18n string -->
<i18n>
{
  "en-GB": {
    "footer": {
      "v1Link": "View this page on Oengus v1"
    }
  }
}
</i18n>
