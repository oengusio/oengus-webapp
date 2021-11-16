<template>
  <div>
    <WidgetLoading :while="[ ]" />

    <ElementTable class="marathon-calendar-table">
      <template v-for="day in days">
        <ElementTableCell :key="`day-${day}`" is-header class="day is-info" column-start="1" column-end="-1">
          <ElementTemporalDateTime :datetime="getDate(day)" format="longDate" />
        </ElementTableCell>

        <template v-for="(marathon, index) in getMarathons(day)">
          <CalendarViewRow :key="`day-${day}-marathon-${marathon.id}`" :marathon="marathon" :class="getClasses(marathon, index)" />
        </template>
      </template>
    </ElementTable>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { Marathon, MarathonForDateParams, MarathonState } from '~/types/api/marathon';

export default Vue.extend({
  props: {
    year: {
      type: Number,
      default: new Date().getFullYear(),
    },
    month: {
      type: Number,
      // JavaScript offests by one month (0 indexed)
      default: new Date().getMonth() + 1,
    },
  },

  async fetch(): Promise<void> {
    await Promise.allSettled([
      this.getCalendar(this.calendarParams),
    ]);
  },

  computed: {
    days(): number {
      // JS has a date offset of one, but we want the month after to get the length
      return new Date(this.year, this.month, 0).getDate();
    },
    calendar(): Array<Marathon>|undefined {
      return (this.$store.state.api.marathon as MarathonState).calendars[`${this.start}-${this.end}`];
    },
    start(): Date {
      return new Date(Date.UTC(this.year, this.month - 1, 0));
    },
    end(): Date {
      return new Date(Date.UTC(this.year, this.month, 2));
    },
    calendarParams(): { data: MarathonForDateParams } {
      return {
        data: {
          // Fetch a slightly larger range the current month
          start: this.start.toISOString(),
          end: this.end.toISOString(),
          zoneId: 'Etc/UTC',
        },
      };
    },
  },

  methods: {
    getDate(day: number): string {
      // JavaScript offests by one month (0 indexed)
      return new Date(this.year, this.month - 1, day).toString();
    },
    getMarathons(day: number): Array<Marathon>|undefined {
      const dayStart = new Date(this.year, this.month - 1, day);
      const dayEnd = new Date(this.year, this.month, day + 1);
      return this.calendar?.filter(marathon => new Date(marathon.endDate) >= dayStart && new Date(marathon.startDate) <= dayEnd);
    },
    getClasses(marathon: Marathon, index: number): { 'is-primary': boolean, 'is-even': boolean, 'is-odd': boolean } {
      const now = new Date();
      return {
        'is-even': index % 2 === 0,
        'is-odd': index % 2 === 1,
        'is-primary': new Date(marathon.startDate) <= now && now <= new Date(marathon.endDate),
      };
    },
    ...mapActions({
      getCalendar: 'api/marathon/calendar',
    }),
  },
});
</script>

<style lang="scss" scoped>
@use '~assets/table';

.marathon-calendar-table {
  @include table.shrink(3);

  > .day {
    text-align: center;
  }
}
</style>
