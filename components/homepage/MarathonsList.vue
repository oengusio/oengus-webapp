<template>
  <div class="marathons-list-container">
    <template v-for="(marathon, index) in marathons">
      <span :key="'name' + index" class="notification" :class="getRowParity(index)">
        <NuxtLink :to="localePath(`/marathon/${marathon.id}`)">
          {{ marathon.name }}
        </NuxtLink>
      </span>
      <span :key="'location' + index" class="notification location" :class="getRowParity(index)">
        <span v-if="marathon.onsite" class="flag-icon" :class="`flag-icon-${marathon.country.toLowerCase()}`" />
        <FontAwesomeIcon v-else :icon="[ 'fas', 'globe' ]" />
      </span>
      <span :key="'language' + index" class="notification" :class="getRowParity(index)">
        {{ marathon.language.toLocaleUpperCase() }}
      </span>
      <span :key="'time' + index" class="notification" :class="getRowParity(index)">
        {{ $t(timeTranslationKey, { duration: 'DURATION' }) }}
      </span>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    marathons: {
      type: Array,
      default: () => [ ],
    },
    timeTranslationKey: {
      type: String,
      default: 'homepage.ends',
    },
  },
  methods: {
    getRowParity(index: number): { 'is-dark': boolean } {
      return {
        'is-dark': index % 2 === 1,
      };
    },
  },
});
</script>

<style lang="scss" scoped>
  .marathons-list-container {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, auto);
    grid-auto-rows: auto;

    > * {
      // A lot of the notification styling is undesirable in this context
      padding: calc(var(--spacing) / 2);
      margin-block-end: 0;
      border-radius: 0;

      &.location {
        display: flex;
        justify-content: center;
      }
    }
  }
</style>
