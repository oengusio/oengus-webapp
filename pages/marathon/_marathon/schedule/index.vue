<template>
  <div>
    <div class="level">
      <div class="level-left">
        <h3 class="title is-3 level-item">
          {{ $t('marathon.schedule.title') }}
        </h3>
      </div>
      <div class="level-right">
        <MarathonScheduleExport class="level-item" />
      </div>
    </div>

    <div class="current-runs-container block">
      <MarathonScheduleCurrent />
      <MarathonScheduleCurrent is-next />
    </div>

    <p class="block">
      {{ $t('marathon.schedule.timezone') }}
    </p>

    <MarathonScheduleList :runs="runs" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import bsgSchedule from '~/test-data/schedule-bsg2021.json';

export default Vue.extend({
  data() {
    return {
      runs: bsgSchedule.lines,
    };
  },
});
</script>

<style lang="scss" scoped>
  .current-runs-container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: stretch;
    gap: var(--spacing);

    > * {
      min-width: min(400px, 100%);
      flex-grow: 1;
    }
  }
</style>
