<template>
  <div>
    <CalendarController :year="year" :month="month" />
    <CalendarView :year="year" :month="month" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  computed: {
    year(): number {
      return Number.parseInt(this.$route.query.calendarYear as string ?? new Date().getFullYear(), 10);
    },
    month(): number {
      return Number.parseInt(this.$route.query.calendarMonth as string ?? new Date().getMonth() + 1, 10);
    },
  },
});
</script>
