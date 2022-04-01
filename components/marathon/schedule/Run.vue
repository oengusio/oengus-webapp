<template>
  <div class="run-detail-container">
    <div class="header">
      <h4 class="title is-4">
        {{ run.setupBlock ? (run.setupBlockText || $t('marathon.schedule.setupBlock')) : run.gameName }}
      </h4>
      <User v-for="runner in run.runners" :key="runner.id" :user="runner" is-link />
    </div>

    <template v-if="run.date">
      <span class="is-label">{{ $t('marathon.schedule.table.time') }}</span>
      <span>
        <ElementTemporalDateTime :datetime="run.date" format="mediumDateTime" />
        (<ElementTemporalDistance :datetime="run.date" />)
      </span>
    </template>

    <template v-if="run.categoryName">
      <span class="is-label">{{ $t('marathon.schedule.table.category') }}</span>
      <span>
        {{ run.categoryName }}
      </span>
    </template>

    <template v-if="run.type">
      <span class="is-label">{{ $t('marathon.schedule.table.type') }}</span>
      <span>
        {{ $t(`marathon.schedule.type.${run.type}`) }}
      </span>
    </template>

    <template v-if="run.console">
      <span class="is-label">{{ $t('marathon.schedule.table.console') }}</span>
      <ElementConsole :console="run.console" :is-emulated="run.emulated" />
    </template>

    <template v-if="run.estimate">
      <span class="is-label">{{ $t('marathon.schedule.table.estimate') }}</span>
      <ElementTemporalDuration :duration="run.estimate" />
    </template>

    <template v-if="run.setupTime">
      <span class="is-label">{{ $t('marathon.schedule.table.setup') }}</span>
      <ElementTemporalDuration :duration="run.setupTime" />
    </template>

    <span class="is-label">{{ $t('marathon.schedule.table.link') }}</span>
    <ElementLink :to="`#run-${run.id}`" rel="nofollow">
      {{ `#run-${run.id}` }}
    </ElementLink>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    run: {
      type: Object,
      default: () => ({ }),
    },
  },
});
</script>

<style lang="scss" scoped>
.run-detail-container {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-auto-rows: auto;
  gap: calc(var(--spacing) / 2);

  > .header {
    grid-column: 1 / -1;
    text-align: center;

    > .title {
      margin-block-end: calc(var(--spacing) / 2);
    }
  }

  > .is-label {
    font-weight: bold;
    justify-self: end;
    white-space: nowrap;

    &::after {
      content: ':';
    }
  }

  > *:not(.is-label) {
    overflow-x: auto;
  }
}
</style>
