<template>
  <div class="notification run-detail-container">
    <span class="is-label">{{ $t('marathon.schedule.table.time') }}</span>
    <span>
      {{ new Intl.DateTimeFormat('en-GB', { timeStyle: 'short' }).format(new Date(run.date)) }}
      (<WidgetTemporalDistance :datetime="run.date" />)
    </span>

    <span class="is-label">{{ $t('marathon.schedule.table.runner') }}</span>
    <span>
      <p v-for="runner in run.runners" :key="runner.id">
        {{ runner.username }}
      </p>
    </span>

    <span class="is-label">{{ $t('marathon.schedule.table.game') }}</span>
    <span>
      {{ run.gameName }}
    </span>

    <span class="is-label">{{ $t('marathon.schedule.table.category') }}</span>
    <span>
      {{ run.categoryName }}
    </span>

    <span class="is-label">{{ $t('marathon.schedule.table.type') }}</span>
    <span>
      {{ run.type }}
    </span>

    <span class="is-label">{{ $t('marathon.schedule.table.console') }}</span>
    <span>
      {{ run.console }}
    </span>

    <span class="is-label">{{ $t('marathon.schedule.table.estimate') }}</span>
    <WidgetTemporalDuration :duration="run.estimate" />

    <span class="is-label">{{ $t('marathon.schedule.table.setup') }}</span>
    <WidgetTemporalDuration :duration="run.setupTime" />

    <span class="is-label">{{ $t('marathon.schedule.table.link') }}</span>
    <a :href="'#run-' + run.id" rel="nofollow">
      {{ `#run-${run.id}` }}
    </a>
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

    > .is-label {
      font-weight: bold;
      justify-self: end;
      white-space: nowrap;

      &::after {
        content: ':';
      }
    }
  }
</style>

<!-- Temporary language info to avoid having the i18n string -->
<i18n>
{
  "en": {
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
