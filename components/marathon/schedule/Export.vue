<template>
  <ElementDropdown is-right>
    <template #trigger>
      {{ $t('marathon.schedule.export.title') }}
    </template>
    <template #options>
      <a v-for="format in formats" :key="format" :href="getExportUrl(format)" target="_blank" class="dropdown-item">
        {{ $t(`marathon.schedule.export.${format}`) }}
      </a>
    </template>
  </ElementDropdown>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      formats: [ 'ics', 'csv', 'json' ],
    };
  },

  methods: {
    getExportUrl(format: string): string {
      return `${this.$config.http.browserBaseURL}marathons/${this.$route.params.marathon}/schedule/export?format=${format}&zoneId=${this.$temporal.timeZone.timeZone}&locale=${this.$i18n.locale}`;
    },
  },
});
</script>
