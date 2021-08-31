<template>
  <div class="homepage-marathons-container">
    <h3 class="title is-3">
      <span>
        {{ $t('calendar.title') }}
      </span>
      <span>
        (<NuxtLink :to="localePath('/calendar')">{{ $t('homepage.marathons.calendar') }}</NuxtLink>)
      </span>
    </h3>

    <div class="marathons-list-container">
      <template v-for="marathonsList in marathonsLists">
        <template v-if="homepageMarathons[marathonsList.key].length">
          <h4 :key="marathonsList.key + 'title'" class="title" :class="marathonsList.headerClass">
            {{ $t(marathonsList.label) }}
          </h4>
          <div :key="marathonsList.key + 'prespacer'" class="spacer" />
          <template v-for="(marathon, index) in homepageMarathons[marathonsList.key]">
            <span :key="marathonsList.key + 'name' + index" class="notification" :class="getRowParity(index)">
              <NuxtLink :to="localePath(`/marathon/${marathon.id}`)">
                {{ marathon.name }}
              </NuxtLink>
            </span>
            <span :key="marathonsList.key + 'location' + index" class="notification location" :class="getRowParity(index)">
              <span v-if="marathon.onsite" class="icon flag-icon" :class="`flag-icon-${marathon.country.toLowerCase()}`" />
              <FontAwesomeIcon v-else :icon="[ 'fas', 'desktop' ]" class="icon" />
            </span>
            <span :key="marathonsList.key + 'language' + index" class="notification" :class="getRowParity(index)">
              {{ marathon.language.toLocaleUpperCase() }}
            </span>
            <span :key="marathonsList.key + 'time' + index" class="notification time" :class="getRowParity(index)">
              {{ $t(marathonsList.timeTranslationKey, { duration: $temporal.distance.format(marathon[marathonsList.timeTranslationValue]) }) }}
            </span>
          </template>
          <div :key="marathonsList.key + 'postspacer'" class="spacer" />
        </template>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import homepageMarathons from '~/test-data/homepage-marathons-20210824.json';

export default Vue.extend({
  data() {
    return {
      homepageMarathons,
      marathonsLists: [
        {
          key: 'live',
          label: 'homepage.marathons.live',
          timeTranslationKey: 'homepage.ends',
          timeTranslationValue: 'endDate',
          headerClass: 'is-3',
        },
        {
          key: 'next',
          label: 'homepage.marathons.upcoming',
          timeTranslationKey: 'homepage.starts',
          timeTranslationValue: 'startDate',
          headerClass: 'is-4',
        },
        {
          key: 'open',
          label: 'homepage.marathons.open',
          timeTranslationKey: 'homepage.submissions_close',
          timeTranslationValue: 'submissionsEndDate',
          headerClass: 'is-4',
        },
      ],
    };
  },
  methods: {
    getRowParity(index: number): { 'is-dark': boolean } {
      return {
        'is-dark': index % 2 === 0,
      };
    },
  },
});
</script>

<style lang="scss" scoped>
  .homepage-marathons-container {
    width: 100%;
  }

  .marathons-list-container {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, auto);
    grid-template-columns: auto min-content min-content auto;
    grid-auto-rows: auto;

    > * {
      // A lot of the notification styling is undesirable in this context
      padding: calc(var(--spacing) / 2);
      margin-block-end: 0;
      border-radius: 0;

      &.title {
        // Span from start to finish
        grid-column: 1 / -1;
        padding-inline-start: 0;
      }

      &.location {
        display: flex;
        justify-content: center;
      }

      &.time {
        text-align: end;
      }

      &.spacer {
        // Span from start to finish
        grid-column: 1 / -1;
        height: var(--spacing);
      }
    }
  }
</style>
