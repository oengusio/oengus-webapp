<template>
  <div>
    <div class="is-centered">
      <WidgetLoading :while="[ calendar ]" @done="isLoading = false" />
    </div>

    <ElementTable v-if="!isLoading" class="marathon-calendar-table">
      <template v-for="(dailyCalendar, datetime) in dailyCalendars">
        <template v-if="Array.isArray(dailyCalendar)">
          <ElementTableCell
            :key="`day-${datetime}`"
            is-header
            class="day"
            :class="isToday(datetime)"
            column-start="1"
            column-end="-1"
          >
            <ElementTemporalDateTime :datetime="datetime" format="longDate" />
          </ElementTableCell>

          <template v-for="(marathon, index) in dailyCalendar">
            <CalendarViewRow :key="`day-${datetime}-marathon-${marathon.id}`" :marathon="marathon" :datetime="datetime" :class="getClasses(index)" />
          </template>
        </template>
        <template v-else>
          <ElementTableCell
            :key="`day-range-${datetime}`"
            is-header
            class="day-range"
            :class="isToday(dailyCalendar, datetime)"
            column-start="1"
            column-end="-1"
          >
            <ElementTemporalRange :start="dailyCalendar" :end="datetime" format="longDate" />
          </ElementTableCell>

          <ElementTableCell :key="`no-marathons-${datetime}`" class="no-marathons is-even" column-start="1" column-end="-1">
            {{ $t('calendar.noMarathons') }}
          </ElementTableCell>
        </template>
      </template>
    </ElementTable>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { Marathon, MarathonCalendar, MarathonForDateParams, MarathonState } from '~/types/api/marathon';

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

  data() {
    return {
      isLoading: true,
    };
  },

  async fetch(): Promise<void> {
    await Promise.allSettled([
      this.getCalendar(this.calendarParams),
    ]);
  },

  computed: {
    calendar(): MarathonCalendar|undefined {
      return (this.$store.state.api.marathon as MarathonState).calendars?.[`${this.start}-${this.end}`];
    },
    dailyCalendars(): { [datetime: string]: Array<Marathon>|string } {
      const dailyCalendars: { [datetime: string]: Array<Marathon>|string } = { };
      let startNoMarathonRun: Date|undefined;
      const days = new Date(this.year, this.month, 0).getDate();
      for (let day = 1; day <= days; day++) {
        const marathons = this.getMarathons(day);
        if (marathons?.length) {
          if (startNoMarathonRun) {
            dailyCalendars[new Date(this.year, this.month - 1, day - 1).toISOString()] = startNoMarathonRun.toISOString();
            startNoMarathonRun = undefined;
          }
          dailyCalendars[new Date(this.year, this.month - 1, day).toISOString()] = marathons;
        } else if (!startNoMarathonRun) {
          startNoMarathonRun = new Date(this.year, this.month - 1, day);
        }
      }
      // If the month ends on a non-run day
      if (startNoMarathonRun) {
        dailyCalendars[new Date(this.year, this.month, 0).toISOString()] = startNoMarathonRun.toISOString();
      }
      return dailyCalendars;
    },
    start(): string {
      return new Date(Date.UTC(this.year, this.month - 1, 0)).toISOString();
    },
    end(): string {
      return new Date(Date.UTC(this.year, this.month, 2)).toISOString();
    },
    calendarParams(): { data: MarathonForDateParams } {
      return {
        data: {
          // Fetch a slightly larger range the current month
          start: this.start,
          end: this.end,
          zoneId: 'Etc/UTC',
        },
      };
    },
  },

  watch: {
    calendarParams(): void {
      this.getCalendar(this.calendarParams);
    },
  },

  methods: {
    getDate(day: number): string {
      // JavaScript offests by one month (0 indexed)
      return new Date(this.year, this.month - 1, day).toString();
    },
    getMarathons(day: number): Array<Marathon>|undefined {
      const dayStart = new Date(this.year, this.month - 1, day);
      const dayEnd = new Date(this.year, this.month - 1, day + 1);
      return this.calendar?.calendar?.filter(marathon => new Date(marathon.endDate) > dayStart && new Date(marathon.startDate) < dayEnd);
    },
    getClasses(index: number): { 'is-even': boolean, 'is-odd': boolean } {
      return {
        'is-even': index % 2 === 0,
        'is-odd': index % 2 === 1,
      };
    },
    isToday(firstDay: string|Date, lastDay?: string|Date): { 'is-primary': boolean, 'is-info': boolean } {
      if (typeof firstDay === 'string') {
        firstDay = new Date(firstDay);
      }
      if (typeof lastDay === 'string') {
        lastDay = new Date(lastDay);
      }
      lastDay ??= firstDay;
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
      const isToday = firstDay.getTime() <= today && today <= lastDay.getTime();
      return {
        'is-primary': isToday,
        'is-info': !isToday,
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
  @include table.shrink(4, (
    500px '.links' 3,
  ));

  > .day,
  > .day-range {
    text-align: center;
  }

  // Only display the "no marathons" text if there are no marathons for the whole month
  // Because of compensations dealing with timezones, it's not as simple as "array length"
  > .no-marathons {
    display: none;

    &:nth-child(2):last-child {
      display: inherit;
    }
  }
}
</style>

<!-- Temporary language info to avoid having the i18n string -->
<i18n>
{
  "en-GB": {
    "calendar": {
      "noMarathons": "There are no marathons in this date range."
    }
  }
}
</i18n>
