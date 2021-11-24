<template>
  <ElementTableRow>
    <ElementTableCell class="duration">
      <ElementRange class="duration-range" :min="0" :max="24" :start="start" :end="end" />
    </ElementTableCell>
    <ElementTableCell class="name">
      <ElementLink :to="`/marathon/${marathon.id}`">
        {{ marathon.name }}
      </ElementLink>
    </ElementTableCell>
    <ElementTableCell class="links">
      <MarathonSidebarOverview :marathon-id="marathon.id" collapsed />
    </ElementTableCell>
  </ElementTableRow>
</template>

<script lang="ts">
import Vue from 'vue';
import { Marathon } from '~/types/api/marathon';

export default Vue.extend({
  props: {
    marathon: {
      type: Object as () => Marathon,
      default: undefined,
    },
    datetime: {
      type: String,
      // The Date() function returns a string denoting "now"
      default: () => Date(),
    },
  },

  computed: {
    start(): number {
      return this.todayStart < this.marathonStart ? this.getHoursFraction(this.marathonStart) : 0;
    },
    end(): number {
      return this.todayEnd > this.marathonEnd ? this.getHoursFraction(this.marathonEnd) : 24;
    },
    todayStart(): Date {
      return new Date(this.datetime);
    },
    todayEnd(): Date {
      const todayEnd = new Date(this.todayStart);
      todayEnd.setDate(this.todayStart.getDate() + 1);
      return todayEnd;
    },
    marathonStart(): Date {
      return new Date(this.marathon.startDate);
    },
    marathonEnd(): Date {
      return new Date(this.marathon.endDate);
    },
  },

  methods: {
    getHoursFraction(date: Date): number {
      return date.getHours() + date.getMinutes() / 60;
    },
  },
});
</script>

<style lang="scss" scoped>
.duration-range {
  width: 100px;
}
</style>
