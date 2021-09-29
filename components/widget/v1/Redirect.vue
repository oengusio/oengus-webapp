<template>
  <ElementLink v-if="shouldShowRedirectLink" :to="`${$route.path}/v1`" class="button is-warning">
    {{ $t('footer.v1Link') }}
  </ElementLink>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      shouldShowRedirectLink: this.$config.env.DOMAIN_V1,
    };
  },
});
</script>

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
