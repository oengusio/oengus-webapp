<template>
  <div class="marathon-calendar-container">
    <CalendarController :year="year" :month="month" />
    <CalendarView :year="year" :month="month" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    year: {
      type: Number,
      default: new Date().getFullYear(),
    },
    month: {
      type: Number,
      default: new Date().getMonth(),
    },
  },
});
</script>

<style lang="scss" scoped>
.marathon-calendar-container {
  > :not(:last-child) {
    margin-block-end: var(--spacing);
  }
}
</style>
