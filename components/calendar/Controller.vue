<template>
  <div class="controller-container">
    <h4 class="title is-4">
      <ElementTemporalDateTime :datetime="datetime" format="longMonth" />
    </h4>
    <div class="controls-container">
      <ElementLink :to="`/calendar/${previousCalendar.year}/${previousCalendar.month}`" class="button">
        <FontAwesomeIcon :icon="[ 'fas', 'caret-left' ]" />
      </ElementLink>
      <ElementLink to="/calendar" class="button" no-active>
        {{ $t('calendar.now') }}
      </ElementLink>
      <ElementLink :to="`/calendar/${nextCalendar.year}/${nextCalendar.month}`" class="button">
        <FontAwesomeIcon :icon="[ 'fas', 'caret-right' ]" />
      </ElementLink>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

interface CalendarLinkInfo {
  year: number;
  month: number;
}

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

  computed: {
    datetime(): string {
      return new Date(this.year, this.month - 1).toISOString();
    },
    previousCalendar(): CalendarLinkInfo {
      return {
        year: this.month !== 1 ? this.year : this.year - 1,
        month: this.month !== 1 ? this.month - 1 : 12,
      };
    },
    nextCalendar(): CalendarLinkInfo {
      return {
        year: this.month !== 12 ? this.year : this.year + 1,
        month: this.month !== 12 ? this.month + 1 : 1,
      };
    },
  },
});
</script>

<style lang="scss" scoped>
@use 'sass:math' as math;
@use '~bulmaswatch/solar/variables' as solar;
@use '~bulma/sass/utilities/initial-variables' as bulma;

.controller-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing);
}

.title {
  margin: 0;
}

.controls-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  > * {
    border-radius: 0;

    &:first-child {
      border-start-start-radius: bulma.$radius-rounded;
      border-end-start-radius: bulma.$radius-rounded;
      border-inline-start-width: solar.$border-width;
    }

    &:last-child {
      border-start-end-radius: bulma.$radius-rounded;
      border-end-end-radius: bulma.$radius-rounded;
      border-inline-end-width: solar.$border-width;
    }
  }
}
</style>

<!-- Temporary language info to avoid having the i18n string -->
<i18n>
{
  "en-GB": {
    "calendar": {
      "now": "Now"
    }
  }
}
</i18n>
