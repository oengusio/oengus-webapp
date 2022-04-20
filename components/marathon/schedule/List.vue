<template>
  <div>
    <div class="schedule-container">
      <WidgetAdvertisement class="is-advertisement" show-advertisement is-horizontal />
      <!-- Header -->
      <ElementTableCell is-header class="expandable" />
      <ElementTableCell is-header class="time">
        {{ $t('marathon.schedule.table.time') }}
      </ElementTableCell>
      <ElementTableCell is-header class="runners">
        {{ $t('marathon.schedule.table.runner') }}
      </ElementTableCell>
      <ElementTableCell is-header class="game">
        {{ $t('marathon.schedule.table.game') }}
      </ElementTableCell>
      <ElementTableCell is-header class="category">
        {{ $t('marathon.schedule.table.category') }}
      </ElementTableCell>
      <ElementTableCell is-header class="type">
        {{ $t('marathon.schedule.table.type') }}
      </ElementTableCell>
      <ElementTableCell is-header class="console">
        {{ $t('marathon.schedule.table.console') }}
      </ElementTableCell>
      <ElementTableCell is-header class="estimate">
        {{ $t('marathon.schedule.table.estimate') }}
      </ElementTableCell>
      <ElementTableCell is-header class="setup">
        {{ $t('marathon.schedule.table.setup') }}
      </ElementTableCell>
      <!-- Main Schedule Loop -->
      <template v-if="runs">
        <template v-for="(run, index) in runs">
          <WidgetAdvertisement
            v-show="shouldShowDay(index) && index !== 0"
            :key="`advertisement-${index}`"
            class="is-advertisement"
            :show-advertisement="advertisementIndices.includes(index)"
            show-spacer
            is-horizontal
          />

          <ElementTableCell v-show="shouldShowDay(index)" :key="`day-${index}`" class="day is-info" column-start="1" column-end="-1">
            <ElementTemporalDateTime :datetime="run.date" format="longDate" />
          </ElementTableCell>

          <!-- XXX @click.native will stop working in Vue v3+ (Vue Router v4+), but @click should start working -->
          <MarathonScheduleRow
            :key="`run-${index}`"
            class="run"
            :class="getRowParity(index, run)"
            :run="run"
            :is-expanded="expanded.has(run.id)"
            :internal-id="getId(run)"
            @click.native="toggleExpand(run)"
          />

          <ElementTableDetail v-if="expanded.has(run.id)" :key="`expanded-${index}`" class="expanded-run" :class="getRowParity(index, run)">
            <MarathonScheduleRun :run="run" />
          </ElementTableDetail>
        </template>
      </template>
    </div>
    <div class="is-centered">
      <WidgetLoading :while="[ schedule ]" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { Schedule, ScheduleLine, ScheduleState, ScheduleTicker } from '~/types/api/schedule';

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
    schedule(): Schedule|undefined {
      return (this.$store.state.api.schedule as ScheduleState).schedules[this.marathonId];
    },
    runs(): Array<ScheduleLine>|undefined {
      return this.schedule?.lines;
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
      this.expandRunHash();
    },
  },

  mounted(): void {
    this.interval = setInterval(() => {
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
    toggleExpand(run?: ScheduleLine|number, openOnly = false): void {
      if (!run) {
        return;
      }
      if (typeof run !== 'number') {
        run = run.id;
      }
      if (this.expanded.has(run) && !openOnly) {
        this.expanded.delete(run);
      } else {
        this.expanded.add(run);
      }
      this.expanded = new Set(this.expanded);
    },
    expandRunHash(): void {
      if (this.runHash) {
        const runHashRegExp = /^#run-(\d+)$/;
        const runHashResults = runHashRegExp.exec(this.runHash);
        if (runHashResults) {
          this.toggleExpand(Number.parseInt(runHashResults[1]), true);
        } else if (this.tickers) {
          if (this.runHash === '#current') {
            this.toggleExpand(this.tickers.current, true);
          } else if (this.runHash === '#next') {
            this.toggleExpand(this.tickers.next, true);
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
    getRowParity(index: number, run: ScheduleLine): { 'is-primary': boolean, 'is-even': boolean, 'is-odd': boolean } {
      return {
        'is-even': index % 2 === 0,
        'is-odd': index % 2 === 1,
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
@use '~assets/table';

.schedule-container {
  @include table.shrink($default-template-columns: 9, $has-expand-button: true, $shrinking-rules: (
    1150px '.setup' 8,
    1023px '.console' 7,
    900px '.type' 6,
    768px '.estimate' 5,
    600px '.category' 4,
  ));

  // Temporary relocation of ElementTable styling
  display: grid;
  grid-auto-rows: auto;
  width: 100%;
  max-width: 100%;
  // End temporary styles
  overflow-x: auto;

  > .run {
    cursor: pointer;
  }

  > .day {
    font-weight: bold;
    text-align: center;
  }

  > .is-advertisement {
    // Span from start to finish
    grid-column: 1 / -1;
    justify-self: center;
  }
}

// This solution is less than ideal.
// I'd prefer to avoid leaking information from parents, this isn't portable
// This allows these rules to work only when in desktop and when the sidebar is expanded
@media (min-width: 1023px) {
  .marathon-container:not(.collapsed) .schedule-container {
    @include table.shrink($default-template-columns: 9, $has-expand-button: true, $shrinking-rules: (
      1450px '.setup' 8,
      1350px '.console' 7,
      1250px '.type' 6,
      1100px '.estimate' 5,
    ));
  }
}

@media (max-width: 500px) {
  // At really small sizes, long names can become problematic
  // this allows them to take scrollbars instead. We don't do this at every
  // size, since doing this forces scrolls when they aren't needed
  ::v-deep .runners,
  ::v-deep .game {
    overflow-x: auto;
  }
}
</style>
