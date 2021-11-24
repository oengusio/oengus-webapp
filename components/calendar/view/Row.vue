<template>
  <ElementTableRow>
    <ElementTableCell class="duration">
      <i18n :path="durationText" tag="span">
        <template #start-time>
          <ElementTemporalDateTime :datetime="marathon.startDate" format="shortTime" />
        </template>
        <template #end-time>
          <ElementTemporalDateTime :datetime="marathon.endDate" format="shortTime" />
        </template>
        <template #time-range>
          <ElementTemporalRange :start="marathon.startDate" :end="marathon.endDate" format="shortTime" />
        </template>
      </i18n>
    </ElementTableCell>
    <ElementTableCell class="range">
      <ElementRange class="range-bar" :min="0" :max="24" :start="start" :end="end" />
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
    durationText(): string {
      let durationText: string;
      if (this.start === 0) {
        if (this.end === 24) {
          durationText = 'calendar.allDay';
        } else {
          durationText = 'calendar.endsAt';
        }
      } else if (this.end === 24) {
        durationText = 'calendar.startsAt';
      } else {
        durationText = 'calendar.between';
      }
      return durationText;
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
.range-bar {
  width: 100px;
}
</style>

<!-- Temporary language info to avoid having the i18n string -->
<i18n>
{
  "en-GB": {
    "calendar": {
      "allDay": "All day",
      "endsAt": "Ends {{end-time}}",
      "startsAt": "Begins {{start-time}}",
      "between": "{{time-range}}"
    }
  }
}
</i18n>
