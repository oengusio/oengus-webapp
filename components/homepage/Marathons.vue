<template>
  <div class="homepage-marathons-container">
    <h3 class="title is-3">
      <span>
        {{ $t('calendar.title') }}
      </span>
      <span>
        (<ElementLink to="/calendar">{{ $t('homepage.marathons.calendar') }}</ElementLink>)
      </span>
    </h3>

    <ElementTable v-if="homepageMarathons" class="marathons-list-container">
      <template v-for="marathonsList in marathonsLists">
        <template v-if="shouldRenderList(marathonsList.key)">
          <h4 :key="marathonsList.key + 'title'" class="title" :class="marathonsList.headerClass">
            {{ $t(marathonsList.label) }}
          </h4>
          <div :key="marathonsList.key + 'prespacer'" class="spacer" />
          <template v-for="(marathon, index) in homepageMarathons[marathonsList.key]">
            <ElementTableCell :key="marathonsList.key + 'name' + index" class="marathon-name" :class="getRowParity(index)">
              <ElementLink :to="`/marathon/${marathon.id}`">
                {{ marathon.name }}
              </ElementLink>
            </ElementTableCell>
            <ElementTableCell :key="marathonsList.key + 'location' + index" class="location" :class="getRowParity(index)">
              <span v-if="marathon.onsite && marathon.country" class="icon flag-icon" :class="`flag-icon-${marathon.country.toLowerCase()}`" />
              <FontAwesomeIcon v-else :icon="[ 'fas', 'desktop' ]" class="icon" />
            </ElementTableCell>
            <ElementTableCell :key="marathonsList.key + 'language' + index" class="language" :class="getRowParity(index)">
              {{ marathon.language.toLocaleUpperCase() }}
            </ElementTableCell>
            <ElementTableCell :key="marathonsList.key + 'time' + index" class="time" :class="getRowParity(index)">
              <i18n :path="marathonsList.timeTranslationKey">
                <template #duration>
                  <ElementTemporalDistance :datetime="getMarathonDistance(marathon, marathonsList.timeTranslationValue)" />
                </template>
              </i18n>
            </ElementTableCell>
          </template>
          <div :key="marathonsList.key + 'postspacer'" class="spacer" />
        </template>
      </template>
    </ElementTable>
    <div class="is-centered">
      <WidgetLoading :while="[ homepageMarathons ]" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { FrontPageMarathons, Marathon, MarathonState } from '~/types/api/marathon';

export default Vue.extend({
  data() {
    return {
      marathonsLists: [
        {
          key: 'live',
          label: 'homepage.marathons.live',
          timeTranslationKey: 'homepage.ends',
          timeTranslationValue: [ 'endDate' ],
          headerClass: 'is-3',
        },
        {
          key: 'next',
          label: 'homepage.marathons.upcoming',
          timeTranslationKey: 'homepage.starts',
          timeTranslationValue: [ 'startDate' ],
          headerClass: 'is-4',
        },
        {
          key: 'open',
          label: 'homepage.marathons.open',
          timeTranslationKey: 'homepage.submissions_close',
          timeTranslationValue: [ 'submissionsEndDate', 'startDate' ],
          headerClass: 'is-4',
        },
      ],
    };
  },

  async fetch(): Promise<void> {
    await Promise.allSettled([
      this.getFrontPage(),
    ]);
  },

  computed: {
    homepageMarathons(): FrontPageMarathons|undefined {
      return (this.$store.state.api.marathon as MarathonState).frontPage;
    },
  },

  methods: {
    getRowParity(index: number): { 'is-even': boolean, 'is-odd': boolean } {
      return {
        'is-even': index % 2 === 0,
        'is-odd': index % 2 === 1,
      };
    },
    shouldRenderList(key: keyof FrontPageMarathons): boolean {
      return (this.homepageMarathons?.[key]?.length ?? 0) > 0;
    },
    getMarathonDistance(marathon: Marathon, keys: Array<keyof Marathon>): Date|undefined {
      return keys.map(key => marathon[key] as Date).find(date => date);
    },
    ...mapActions({
      getFrontPage: 'api/marathon/frontPage',
    }),
  },
});
</script>

<style lang="scss" scoped>
  .homepage-marathons-container {
    width: 100%;
  }

  .marathons-list-container {
    grid-template-columns: repeat(4, auto);
    grid-template-columns: auto min-content min-content auto;

    > .title {
      // Span from start to finish
      grid-column: 1 / -1;
      padding-inline-start: 0;
      margin: 0;
    }

    > .location {
      display: flex;
      justify-content: center;
    }

    > .time {
      text-align: end;
    }

    > .spacer {
      // Span from start to finish
      grid-column: 1 / -1;
      height: calc(3 * var(--spacing) / 2);
    }
  }
</style>
