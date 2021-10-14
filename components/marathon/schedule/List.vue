<template>
  <div class="schedule-container">
    <!-- Ad -->
    <AdsByGoogle ad-slot="5905320802" ad-format="" class="is-advertisement" />
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
        <!-- Ad -->
        <ClientOnly :key="'wrapper-advertisement' + index">
          <AdsByGoogle v-if="advertisementIndices.includes(index)" :key="'advertisement' + index" ad-slot="5905320802" ad-format="" class="is-advertisement" />
          <div v-show="shouldShowDay(index) && index !== 0" :key="'not-advertisement' + index" class="is-spacer" />
        </ClientOnly>

        <div v-show="shouldShowDay(index)" :key="'day' + index" class="day notification is-info">
          {{ $d(new Date(run.date), 'longDate') }}
        </div>

        <span :id="getId(run)" :key="'expandable' + index" class="notification is-expandable expandable" :class="getRowParity(index, run)" @click="expand(run)">
          <FontAwesomeIcon :icon="[ 'fas', expanded.has(run.id) ? 'caret-down' : 'caret-right' ]" />
        </span>
        <span :id="'run-' + run.id" :key="'time' + index" class="notification is-expandable time" :class="getRowParity(index, run)" @click="expand(run)">
          {{ $d(new Date(run.date), 'shortTime') }}
        </span>

        <span v-if="run.setupBlock" :key="'setupText' + index" class="notification is-expandable setup-text" :class="getRowParity(index, run)" @click="expand(run)">
          {{ (run.setupBlockText || $t('marathon.schedule.setupBlock')) }}
        </span>
        <template v-else>
          <span :key="'runners' + index" class="notification is-expandable runners" :class="getRowParity(index, run)" @click="expand(run)">
            <p v-for="runner in run.runners" :key="'runners' + index + 'runner' + runner.id">
              {{ runner.username }}
            </p>
          </span>
          <span :key="'game' + index" class="notification is-expandable game" :class="getRowParity(index, run)" @click="expand(run)">
            {{ run.gameName }}
          </span>
        </template>

        <span :key="'category' + index" class="notification is-expandable category" :class="getRowParity(index, run)" @click="expand(run)">
          {{ run.categoryName }}
        </span>
        <span :key="'type' + index" class="notification is-expandable type" :class="getRowParity(index, run)" @click="expand(run)">
          {{ $t(`marathon.schedule.type.${run.type}`) }}
        </span>
        <span :key="'console' + index" class="notification is-expandable console" :class="getRowParity(index, run)" @click="expand(run)">
          <span>
            {{ run.console }}
          </span>
          <sup v-if="run.emulated">
            {{ $t('global.emu') }}
          </sup>
        </span>
        <span :key="'estimate' + index" class="notification is-expandable estimate" :class="getRowParity(index, run)" @click="expand(run)">
          <ElementTemporalDuration :duration="run.estimate" />
        </span>
        <span :key="'setup' + index" class="notification is-expandable setup" :class="getRowParity(index, run)" @click="expand(run)">
          <ElementTemporalDuration :duration="run.setupTime" />
        </span>
        <div v-if="expanded.has(run.id)" :key="'expanded' + index" class="expanded-run">
          <MarathonScheduleRun :run="run" :class="getRowParity(index, run)" />
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
    marathonId: {
      type: String,
      default: '',
    },
    runHash: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      expanded: new Set<number>(),
      interval: undefined as NodeJS.Timeout|undefined,
    };
  },
  async fetch(): Promise<void> {
    await Promise.allSettled([
      this.getSchedule(this.marathonId),
      this.getScheduleTicker(this.marathonId),
    ]);
  },
  computed: {
    runs(): Array<ScheduleLine>|undefined {
      return (this.$store.state.api.schedule as ScheduleState).schedules[this.marathonId]?.lines;
    },
    tickers(): ScheduleTicker|undefined {
      return (this.$store.state.api.schedule as ScheduleState).tickers[this.marathonId];
    },
    advertisementIndices(): Array<number> {
      const advertisementIndices: Array<number> = [ ];
      const minimumGap = 16;
      let index = minimumGap;
      const runsLength = this.runs?.length ?? 0;
      while (index < runsLength) {
        if (this.shouldShowDay(index)) {
          advertisementIndices.push(index);
          index += minimumGap;
          continue;
        }
        index++;
      }
      return advertisementIndices;
    },
  },
  watch: {
    runHash(): void {
      // The `false` makes it so we only expand Current/Next
      // If we don't do this, the ID hashes self-collapse sometimes
      this.expandRunHash(false);
    },
  },
  mounted(): void {
    this.interval = setInterval(() => {
      this.getSchedule(this.marathonId);
      this.getScheduleTicker(this.marathonId);
    }, 60_000);
    this.expandRunHash();
  },
  destroyed(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  },
  methods: {
    expand(run?: ScheduleLine|number): void {
      if (!run) {
        return;
      }
      if (typeof run !== 'number') {
        run = run.id;
      }
      if (this.expanded.has(run)) {
        this.expanded.delete(run);
      } else {
        this.expanded.add(run);
      }
      this.expanded = new Set(this.expanded);
    },
    expandRunHash(expandRunId = true): void {
      if (this.runHash) {
        const runHashRegExp = /^#run-(\d+)$/;
        const runHashResults = runHashRegExp.exec(this.runHash);
        if (runHashResults && expandRunId) {
          this.expand(Number.parseInt(runHashResults[1]));
        } else if (this.tickers) {
          if (this.runHash === '#current') {
            this.expand(this.tickers.current);
          } else if (this.runHash === '#next') {
            this.expand(this.tickers.next);
          }
        }
      }
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
    getRowParity(index: number, run: ScheduleLine): { 'is-dark': boolean, 'is-primary': boolean } {
      return {
        'is-dark': index % 2 === 1,
        'is-primary': run.id === this.tickers?.current?.id,
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
    max-width: 100%;
    overflow-x: auto;
    display: grid;
    grid-template-columns: repeat(9, auto);
    grid-auto-rows: auto;

    > *:not(.expanded-run) {
      // A lot of the notification styling is undesirable in this context
      padding: calc(var(--spacing) / 2);
      margin-block-end: 0;
      border-radius: 0;
    }

    > .is-expandable {
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

    > .setup-text {
      grid-column: 3 / 5;
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

    > .is-spacer {
      // Span from start to finish
      grid-column: 1 / -1;
      height: 50px;
    }

    > .is-advertisement {
      // Span from start to finish
      grid-column: 1 / -1;
      justify-self: center;
      // Advertisements don't play nice with padding, remove it and use margin
      padding: 0;
      margin-block: var(--spacing);
      // Dynamic logic lets AdSense pick from more advertisement options
      height: 100%;
      min-height: 50px;
      max-height: 100px;
      width: 100%;
      min-width: 300px;
      max-width: 728px;

      & + .is-spacer {
        display: none;
      }

      @media (max-width: 1023px) {
        & {
          max-width: 320px;
        }
      }

      &[data-ad-status="unfilled"] {
        display: none !important;

        & + .is-spacer {
          display: block;
        }
      }
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

  // Generic rules, used when the List can occupy the whole width
  @include shrink(1150px, 8, 'setup');
  // Mobile cutoff
  @include shrink(1023px, 7, 'console');
  @include shrink(900px, 6, 'type');
  // Tablet cutoff
  @include shrink(768px, 5, 'estimate');
  @include shrink(600px, 4, 'category');

  // This solution is less than ideal.
  // I'd prefer to avoid leaking information from parents, this isn't portable
  // var() works in calc(), calc() works in @media, but var() doesn't work in calc() in @media
  // This allows these rules to work only when in desktop and when the sidebar is expanded
  @media (min-width: 1023px) {
    .marathon-container:not(.collapsed) {
      @include shrink(1450px, 8, 'setup');
      @include shrink(1350px, 7, 'console');
      @include shrink(1250px, 6, 'type');
      @include shrink(1100px, 5, 'estimate');
    }
  }

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
