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
