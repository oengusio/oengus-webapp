<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <p>
        {{ $t('footer.text', { timezone: $moment.tz.guess() }) }}
      </p>
      <p v-html="$t('footer.donate', { donationLink: 'https://www.patreon.com/oengusio' })" />
      <p>
        &copy; {{ thisYear }}
        <a href="https://esamarathon.com/">
          European Speedrunner Assembly AB
        </a>
      </p>
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      thisYear: new Date().getFullYear(),
    };
  },
});
</script>

<style lang="scss" scoped>
  .footer {
    padding-block-end: 4rem;
  }
</style>
