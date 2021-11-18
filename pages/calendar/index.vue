<template>
  <div>
    <h3 class="title is-3">
      {{ $t('calendar.title') }}
    </h3>
    <Calendar :year="year" :month="month" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  computed: {
    year(): number {
      return Number.parseInt(this.$route.params.year ?? new Date().getFullYear(), 10);
    },
    month(): number {
      return Number.parseInt(this.$route.params.month ?? new Date().getMonth() + 1, 10);
    },
  },
});
</script>
