<template>
  <div class="schedule-container">
    <!-- Header -->
    <span class="notification is-header">
      {{ $t('marathon.schedule.table.time') }}
    </span>
    <span class="notification is-header">
      {{ $t('marathon.schedule.table.runner') }}
    </span>
    <span class="notification is-header">
      {{ $t('marathon.schedule.table.game') }}
    </span>
    <span class="notification is-header">
      {{ $t('marathon.schedule.table.category') }}
    </span>
    <span class="notification is-header">
      {{ $t('marathon.schedule.table.type') }}
    </span>
    <span class="notification is-header">
      {{ $t('marathon.schedule.table.console') }}
    </span>
    <span class="notification is-header">
      {{ $t('marathon.schedule.table.estimate') }}
    </span>
    <span class="notification is-header">
      {{ $t('marathon.schedule.table.setup') }}
    </span>
    <!-- Main Schedule Loop -->
    <template v-for="(run, index) in runs">
      <div v-if="shouldShowDay(index)" :key="'day' + index" class="day notification is-primary">
        {{ Intl.DateTimeFormat('en-GB', { dateStyle: 'long' }).format(new Date(run.date)) }}
      </div>
      <span :key="'time' + index" class="notification" :class="getRowParity(index)" @click="expand(run)">
        {{ Intl.DateTimeFormat('en-GB', { timeStyle: 'short' }).format(new Date(run.date)) }}
      </span>
      <span :key="'runners' + index" class="notification" :class="getRowParity(index)" @click="expand(run)">
        <div v-for="runner in run.runners" :key="'runners' + index + 'runner' + runner.id">
          {{ runner.username }}
        </div>
      </span>
      <span :key="'game' + index" class="notification" :class="getRowParity(index)" @click="expand(run)">
        {{ run.gameName }}
      </span>
      <span :key="'category' + index" class="notification" :class="getRowParity(index)" @click="expand(run)">
        {{ run.categoryName }}
      </span>
      <span :key="'type' + index" class="notification" :class="getRowParity(index)" @click="expand(run)">
        {{ run.type }}
      </span>
      <span :key="'console' + index" class="notification" :class="getRowParity(index)" @click="expand(run)">
        {{ run.console }}
      </span>
      <span :key="'estimate' + index" class="notification" :class="getRowParity(index)" @click="expand(run)">
        {{ run.estimate }}
      </span>
      <span :key="'setup' + index" class="notification" :class="getRowParity(index)" @click="expand(run)">
        {{ run.setupTime }}
      </span>
      <div v-if="run.expanded" :key="'expanded' + index" class="expanded-run">
        <MarathonScheduleLine :run="run" :class="getRowParity(index)" />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    runs: {
      type: Array,
      default: () => [ ],
    },
  },
  methods: {
    expand(run: any): void {
      if (run.expanded === undefined) {
        this.$set(run, 'expanded', false);
      }
      run.expanded = !run.expanded;
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
      const currentRun = new Date((this.runs[index] as any).date);
      // We have an implicit index test for the index=0 case, so this is always safe
      const previousRun = new Date((this.runs[index - 1] as any).date);
      const formatter = new Intl.DateTimeFormat('en-GB', { dateStyle: 'short' });
      return formatter.format(currentRun) !== formatter.format(previousRun);
    },
  },
});
</script>

<style lang="scss" scoped>
  .schedule-container {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(8, auto);
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

    > .expanded-run {
      // Span from start to finish
      grid-column: 1 / -1;
      // Needed to allow the proper placement of the before and after
      position: relative;
      padding-inline-start: var(--spacing);
      padding-block: calc(var(--spacing) / 2);

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
        inset-block-end: calc(100% - var(--spacing));
        inset-inline-start: calc(var(--spacing) / 2);
        width: 2px;
        background-color: #666;
      }
    }

    > .is-header {
      font-weight: bold;
    }
  }
</style>
