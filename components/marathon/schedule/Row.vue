<template>
  <ElementTableRow>
    <ElementTableExpandButton :id="internalId" :is-expanded="isExpanded" class="expandable" />

    <ElementTableCell :id="'run-' + run.id" class="time">
      <ElementTemporalDateTime :datetime="run.date" format="shortTime" />
    </ElementTableCell>

    <ElementTableCell v-if="run.setupBlock" class="setup-text" column-end="span 2">
      {{ (run.setupBlockText || $t('marathon.schedule.setupBlock')) }}
    </ElementTableCell>
    <template v-else>
      <ElementTableCell class="runners">
        <User v-for="runner in run.runners" :key="`runner-${runner.id}`" :user="runner" />
      </ElementTableCell>
      <ElementTableCell class="game">
        {{ run.gameName }}
      </ElementTableCell>
    </template>

    <ElementTableCell class="category">
      {{ run.categoryName }}
    </ElementTableCell>

    <ElementTableCell class="type">
      {{ $t(`marathon.schedule.type.${run.type}`) }}
    </ElementTableCell>

    <ElementTableCell class="console">
      <ElementConsole :console="run.console" :is-emulated="run.emulated" />
    </ElementTableCell>

    <ElementTableCell class="estimate">
      <ElementTemporalDuration :duration="run.estimate" />
    </ElementTableCell>

    <ElementTableCell class="setup">
      <ElementTemporalDuration :duration="run.setupTime" />
    </ElementTableCell>
  </ElementTableRow>
</template>

<script lang="ts">
import Vue from 'vue';
import { ScheduleLine } from '~/types/api/schedule';

export default Vue.extend({
  props: {
    run: {
      type: Object as () => ScheduleLine,
      default: undefined,
    },
    internalId: {
      type: String,
      default: undefined,
    },
    isExpanded: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
