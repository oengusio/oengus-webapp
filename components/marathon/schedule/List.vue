<template>
  <div>
    <ElementTable class="schedule-container">
      <!-- Ad -->
      <AdsByGoogle ad-slot="5905320802" ad-format="" class="is-advertisement" />
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
          <!-- XXX @click.native will stop working in Vue v3+ (Vue Router v4+), but @click should start working -->

          <!-- Ad -->
          <ClientOnly :key="'wrapper-advertisement' + index">
            <AdsByGoogle v-if="advertisementIndices.includes(index)" :key="'advertisement' + index" ad-slot="5905320802" ad-format="" class="is-advertisement" />
            <div v-show="shouldShowDay(index) && index !== 0" :key="'not-advertisement' + index" class="is-spacer" />
          </ClientOnly>

          <ElementTableCell v-show="shouldShowDay(index)" :key="'day' + index" class="day is-info" column-start="1" column-end="-1">
            {{ $d(new Date(run.date), 'longDate') }}
          </ElementTableCell>

          <ElementTableCell :id="getId(run)" :key="'expandable' + index" class="is-expandable expandable" :class="getRowParity(index, run)" @click.native="expand(run)">
            <FontAwesomeIcon :icon="[ 'fas', expanded.has(run.id) ? 'caret-down' : 'caret-right' ]" />
          </ElementTableCell>

          <ElementTableCell :id="'run-' + run.id" :key="'time' + index" class="is-expandable time" :class="getRowParity(index, run)" @click.native="expand(run)">
            {{ $d(new Date(run.date), 'shortTime') }}
          </ElementTableCell>

          <ElementTableCell
            v-if="run.setupBlock"
            :key="'setupText' + index"
            class="is-expandable setup-text"
            :class="getRowParity(index, run)"
            column-end="span 2"
            @click.native="expand(run)"
          >
            {{ (run.setupBlockText || $t('marathon.schedule.setupBlock')) }}
          </ElementTableCell>
          <template v-else>
            <ElementTableCell :key="'runners' + index" class="is-expandable runners" :class="getRowParity(index, run)" @click.native="expand(run)">
              <p v-for="runner in run.runners" :key="'runners' + index + 'runner' + runner.id">
                {{ runner.username }}
              </p>
            </ElementTableCell>
            <ElementTableCell :key="'game' + index" class="is-expandable game" :class="getRowParity(index, run)" @click.native="expand(run)">
              {{ run.gameName }}
            </ElementTableCell>
          </template>

          <ElementTableCell :key="'category' + index" class="is-expandable category" :class="getRowParity(index, run)" @click.native="expand(run)">
            {{ run.categoryName }}
          </ElementTableCell>

          <ElementTableCell :key="'type' + index" class="is-expandable type" :class="getRowParity(index, run)" @click.native="expand(run)">
            {{ $t(`marathon.schedule.type.${run.type}`) }}
          </ElementTableCell>

          <ElementTableCell :key="'console' + index" class="is-expandable console" :class="getRowParity(index, run)" @click.native="expand(run)">
            <span>
              {{ run.console }}
            </span>
            <sup v-if="run.emulated">
              {{ $t('global.emu') }}
            </sup>
          </ElementTableCell>

          <ElementTableCell :key="'estimate' + index" class="is-expandable estimate" :class="getRowParity(index, run)" @click.native="expand(run)">
            <ElementTemporalDuration :duration="run.estimate" />
          </ElementTableCell>

          <ElementTableCell :key="'setup' + index" class="is-expandable setup" :class="getRowParity(index, run)" @click.native="expand(run)">
            <ElementTemporalDuration :duration="run.setupTime" />
          </ElementTableCell>

          <ElementTableDetail v-if="expanded.has(run.id)" :key="'expanded' + index" class="expanded-run" :class="getRowParity(index, run)">
            <MarathonScheduleRun :run="run" />
          </ElementTableDetail>
        </template>
      </template>
    </ElementTable>
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
      // The `false` makes it so we only expand Current/Next
      // If we don't do this, the ID hashes self-collapse sometimes
      this.expandRunHash(false);
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
  .schedule-container {
    overflow-x: auto;
    grid-template-columns: repeat(9, auto);

    > .is-expandable {
      cursor: pointer;
    }

    > .day {
      font-weight: bold;
      text-align: center;
    }

    > .expandable > svg {
      width: 10px;
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
