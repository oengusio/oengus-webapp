<template>
  <div class="schedule-container">
    <!-- Header -->
    <span class="notification is-header expandable" />
    <span class="notification is-header time">
      {{ $t('marathon.schedule.table.time') }}
    </span>
    <span class="notification is-header runners">
      {{ $t('marathon.schedule.table.runner') }}
    </span>
    <span class="notification is-header game">
      {{ $t('marathon.schedule.table.game') }}
    </span>
    <span class="notification is-header category">
      {{ $t('marathon.schedule.table.category') }}
    </span>
    <span class="notification is-header type">
      {{ $t('marathon.schedule.table.type') }}
    </span>
    <span class="notification is-header console">
      {{ $t('marathon.schedule.table.console') }}
    </span>
    <span class="notification is-header estimate">
      {{ $t('marathon.schedule.table.estimate') }}
    </span>
    <span class="notification is-header setup">
      {{ $t('marathon.schedule.table.setup') }}
    </span>
    <!-- Main Schedule Loop -->
    <template v-if="runs">
      <template v-for="(run, index) in runs">
        <div v-show="shouldShowDay(index)" :key="'day' + index" class="day notification is-primary">
          {{ $d(new Date(run.date), 'longDate') }}
        </div>
        <span :id="getId(run)" :key="'expandable' + index" class="notification expandable" :class="getRowParity(index)" @click="expand(run)">
          <FontAwesomeIcon :icon="[ 'fas', expanded.has(run.id) ? 'caret-down' : 'caret-right' ]" />
        </span>
        <span :id="'run-' + run.id" :key="'time' + index" class="notification time" :class="getRowParity(index)" @click="expand(run)">
          {{ $d(new Date(run.date), 'shortTime') }}
        </span>
        <span :key="'runners' + index" class="notification runners" :class="getRowParity(index)" @click="expand(run)">
          <p v-for="runner in run.runners" :key="'runners' + index + 'runner' + runner.id">
            {{ runner.username }}
          </p>
        </span>
        <span :key="'game' + index" class="notification game" :class="getRowParity(index)" @click="expand(run)">
          {{ run.gameName }}
        </span>
        <span :key="'category' + index" class="notification category" :class="getRowParity(index)" @click="expand(run)">
          {{ run.categoryName }}
        </span>
        <span :key="'type' + index" class="notification type" :class="getRowParity(index)" @click="expand(run)">
          {{ $t(`marathon.schedule.type.${run.type}`) }}
        </span>
        <span :key="'console' + index" class="notification console" :class="getRowParity(index)" @click="expand(run)">
          <span>
            {{ run.console }}
          </span>
          <sup v-if="run.emulated">
            {{ $t('global.emu') }}
          </sup>
        </span>
        <span :key="'estimate' + index" class="notification estimate" :class="getRowParity(index)" @click="expand(run)">
          <ElementTemporalDuration :duration="run.estimate" />
        </span>
        <span :key="'setup' + index" class="notification setup" :class="getRowParity(index)" @click="expand(run)">
          <ElementTemporalDuration :duration="run.setupTime" />
        </span>
        <div v-if="expanded.has(run.id)" :key="'expanded' + index" class="expanded-run">
          <MarathonScheduleRun :run="run" :class="getRowParity(index)" />
        </div>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { ScheduleLine, ScheduleState, ScheduleTicker } from '~/types/api/schedule';

export default Vue.extend({
  props: {
    marathon: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      expanded: new Set<number>(),
    };
  },
  async fetch(): Promise<void> {
    await Promise.allSettled([
      this.getSchedule(this.marathon),
      this.getScheduleTicker(this.marathon),
    ]);
  },
  computed: {
    runs(): Array<ScheduleLine>|undefined {
      return (this.$store.state.api.schedule as ScheduleState).schedules[this.marathon]?.lines;
    },
    tickers(): ScheduleTicker|undefined {
      return (this.$store.state.api.schedule as ScheduleState).tickers[this.marathon];
    },
  },
  methods: {
    expand(run: ScheduleLine): void {
      if (this.expanded.has(run.id)) {
        this.expanded.delete(run.id);
      } else {
        this.expanded.add(run.id);
      }
      this.expanded = new Set(this.expanded);
    },
    getId(run: ScheduleLine): string|undefined {
      switch (run.id) {
        case this.tickers?.current?.id:
          return 'current';
        case this.tickers?.next?.id:
          return 'next';
        default:
          return undefined;
      }
    },
    getRowParity(index: number): { 'is-dark': boolean } {
      return {
        'is-dark': index % 2 === 1,
      };
    },
    shouldShowDay(index: number): boolean {
      // Always show the day header at the top
      if (index === 0) {
        return true;
      }
      // Otherwise, only show when the day transitioned
      const currentRun = new Date(this.runs![index].date);
      // We have an implicit index test for the index=0 case, so this is always safe
      const previousRun = new Date(this.runs![index - 1].date);
      return this.$i18n.d(currentRun, 'longDate') !== this.$i18n.d(previousRun, 'longDate');
    },
    ...mapActions({
      getSchedule: 'api/schedule/get',
      getScheduleTicker: 'api/schedule/ticker',
    }),
  },
});
</script>

<style lang="scss" scoped>
  .schedule-container {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(9, auto);
    grid-auto-rows: auto;

    > *:not(.expanded-run) {
      // A lot of the notification styling is undesirable in this context
      padding: calc(var(--spacing) / 2);
      margin-block-end: 0;
      border-radius: 0;
    }

    span {
      cursor: pointer;
    }

    > .day {
      // Span from start to finish
      grid-column: 1 / -1;
      font-weight: bold;
      text-align: center;
    }

    > .expandable > svg {
      width: 10px;
    }

    > .expanded-run {
      // Span from start to finish
      grid-column: 1 / -1;
      // Needed to allow the proper placement of the before and after
      position: relative;
      padding-inline-start: var(--spacing);
      padding-block: calc(var(--spacing) / 2);

      // Provides the strokes for the L connecting the entry to the detail
      &::before {
        content: '';
        position: absolute;
        inset-block-start: var(--spacing);
        inset-inline-start: calc(var(--spacing) / 2);
        width: calc(var(--spacing) / 2);
        height: 2px;
        background-color: #666;
      }

      &::after {
        content: '';
        position: absolute;
        inset-block-start: 0;
        inset-inline-start: calc(var(--spacing) / 2);
        height: var(--spacing);
        width: 2px;
        background-color: #666;
      }
    }

    > .is-header {
      font-weight: bold;
    }
  }

  @mixin shrink($width, $columns, $column) {
    @media (max-width: $width) {
      .schedule-container {
        grid-template-columns: repeat($columns, auto);
      }

      .#{$column} {
        display: none;
      }
    }
  }

  @include shrink(1200px, 8, 'setup');
  @include shrink(1100px, 7, 'console');
  @include shrink(900px, 6, 'type');
  // Tablet cutoff
  @include shrink(768px, 5, 'estimate');
  @include shrink(600px, 4, 'category');

  @media (max-width: 500px) {
    // At really small sizes, long names can become problematic
    // this allows them to take scrollbars instead. We don't do this at every
    // size, since doing this forces scrolls when they aren't needed
    .runners,
    .game {
      overflow-x: auto;
    }
  }
</style>
