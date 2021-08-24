<template>
  <div class="homepage-marathons-container box">
    <h3 class="title is-3">
      <span>
        {{ $t('calendar.title') }}
      </span>
      <span>
        (<NuxtLink :to="localePath('/calendar')">{{ $t('homepage.marathons.calendar') }}</NuxtLink>)
      </span>
    </h3>

    <div v-if="homepageMarathons.live.length">
      <h3 class="title is-3">
        {{ $t('homepage.marathons.live') }}
      </h3>
      <HomepageMarathonsList :marathons="homepageMarathons.live" time-translation-key="homepage.ends" />
      <br>
    </div>

    <div v-if="homepageMarathons.next.length">
      <h4 class="title is-4">
        {{ $t('homepage.marathons.upcoming') }}
      </h4>
      <HomepageMarathonsList :marathons="homepageMarathons.next" time-translation-key="homepage.starts" />
      <br>
    </div>

    <div v-if="homepageMarathons.open.length">
      <h4 class="title is-4">
        {{ $t('homepage.marathons.open') }}
      </h4>
      <HomepageMarathonsList :marathons="homepageMarathons.open" time-translation-key="homepage.submissions_close" />
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
    };
  },
});
</script>

<style lang="scss" scoped>
  .homepage-marathons-container {
    width: 100%;
  }
</style>
