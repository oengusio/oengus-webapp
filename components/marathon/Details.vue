<template>
  <div class="marathon-details-container">
    <div class="marathon-details-info-container">
      <div class="info-box">
        <p class="info-label">
          {{ $t('marathon.home.from') }}
        </p>
        <ElementTemporalDateTime :datetime="marathon.startDate" format="shortDate" class="info" />
      </div>
      <div class="info-box">
        <p class="info-label">
          {{ $t('marathon.home.to') }}
        </p>
        <ElementTemporalDateTime :datetime="marathon.endDate" format="shortDate" class="info" />
      </div>
      <div class="info-box">
        <p class="info-label">
          {{ $t('marathon.home.location') }}
        </p>
        <MarathonLocation :marathon="marathon" class="info" />
      </div>
      <div class="info-box">
        <p class="info-label">
          {{ $t('marathon.home.language') }}
        </p>
        <p class="info">
          {{ $t(`language.${marathon.language}`) }}
        </p>
      </div>
      <a v-if="marathon.twitch" :href="`https://twitch.tv/${marathon.twitch}`" target="_blank" class="info-box">
        <p class="info-label">
          {{ $t('platform.TWITCH') }}
        </p>
        <FontAwesomeIcon :icon="[ 'fab', 'twitch' ]" class="icon info" />
      </a>
      <a v-if="marathon.twitter" :href="`https://twitter.com/${marathon.twitter}`" target="_blank" class="info-box">
        <p class="info-label">
          {{ $t('platform.TWITTER') }}
        </p>
        <FontAwesomeIcon :icon="[ 'fab', 'twitter' ]" class="icon info" />
      </a>
      <a v-if="!marathon.discordPrivacy && marathon.discord" :href="`https://discord.gg/${marathon.discord}`" target="_blank" class="info-box">
        <p class="info-label">
          {{ $t('platform.DISCORD') }}
        </p>
        <FontAwesomeIcon :icon="[ 'fab', 'discord' ]" class="icon info" />
      </a>
      <a v-if="marathon.youtube" :href="marathon.youtube" target="_blank" class="info-box">
        <p class="info-label">
          {{ $t('platform.YOUTUBE') }}
        </p>
        <FontAwesomeIcon :icon="[ 'fab', 'youtube' ]" class="icon info" />
      </a>
    </div>

    <WidgetTwitchPlayer v-if="marathon.twitch && isLive" :channel="marathon.twitch" class="marathon-live-player" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { FullMarathon, MarathonState } from '~/types/api/marathon';

export default Vue.extend({
  props: {
    marathonId: {
      type: String,
      default: '',
    },
  },

  async fetch(): Promise<void> {
    await Promise.allSettled([
      this.getMarathon(this.marathonId),
    ]);
  },

  computed: {
    marathon(): FullMarathon|undefined {
      return (this.$store.state.api.marathon as MarathonState).marathons[this.marathonId];
    },
    isLive(): boolean {
      if (!this.marathon) {
        return false;
      }

      const start = new Date(this.marathon.startDate).getTime();
      const end = new Date(this.marathon.endDate).getTime();
      const now = Date.now();
      return start <= now && now <= end;
    },
  },

  methods: {
    ...mapActions({
      getMarathon: 'api/marathon/get',
    }),
  },
});
</script>

<style lang="scss" scoped>
.marathon-details-container {
  display: grid;
}

.marathon-details-info-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  border-block: 1px solid;
  gap: var(--spacing);
  padding: var(--spacing);

  > .info-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;

    .info {
      font-size: 1.75rem;
      line-height: 1;
    }
  }
}

.marathon-live-player {
  margin-block-start: var(--spacing);
  width: 100%;
  max-width: 2560px;
  height: 40vh;
  max-height: 1440px;
}
</style>

<!-- Temporary language info to avoid having the i18n string -->
<i18n>
{
  "en-GB": {
    "platform": {
      "YOUTUBE": "YouTube"
    }
  }
}
</i18n>
