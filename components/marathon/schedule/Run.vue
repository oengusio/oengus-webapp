<template>
  <div class="notification run-detail-container">
    <div class="header">
      <h4 class="title is-4">
        {{ run.setupBlock ? run.setupBlockText : run.gameName }}
      </h4>
      <p v-for="runner in run.runners" :key="runner.id">
        <ElementLink :to="`/user/${runner.username}`">
          {{ runner.username }}
        </ElementLink>
      </p>
    </div>

    <template v-if="run.date">
      <span class="is-label">{{ $t('marathon.schedule.table.time') }}</span>
      <span>
        {{ $d(new Date(run.date), 'mediumDateTime') }}
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
      <span>
        {{ run.console }}
      </span>
      <sup v-if="run.emulated">
        {{ $t('global.emu') }}
      </sup>
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
    padding: var(--spacing);

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

  @media (max-width: 1023px) {
    .run-detail-container {
      padding: calc(var(--spacing) / 2);
    }
  }
</style>

<!-- Temporary language info to avoid having the i18n string -->
<i18n>
{
  "en-GB": {
    "marathon": {
      "schedule": {
        "table": {
          "link": "Link"
        }
      }
    }
  }
}
</i18n>
