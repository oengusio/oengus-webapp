<template>
  <div v-show="isLoading || ticker">
    <div v-if="ticker" class="message" :class="messageClass">
      <div class="message-header">
        <ElementLink :to="linkedRun">
          {{ $t(messageHeaderTitle, messageHeaderArgs) }}
        </ElementLink>
      </div>
      <div class="message-body">
        <p class="run-info">
          <span v-if="ticker.setupBlock">
            {{ (ticker.setupBlockText || $t('marathon.schedule.setupBlock')) }}
          </span>
          <span v-if="ticker.gameName">
            {{ ticker.gameName }}
          </span>
          <span v-if="ticker.categoryName">
            {{ ticker.categoryName }}
          </span>
          <span v-if="ticker.console">
            {{ ticker.console }}
          </span>
        </p>
        <p class="runner-info">
          <span v-for="runner in ticker.runners" :key="runner.id">{{ runner.username }}</span>
        </p>
      </div>
    </div>
    <div class="is-centered">
      <WidgetLoading :while="[ tickers ]" @done="isLoading = false" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { ScheduleLine, ScheduleState, ScheduleTicker } from '~/types/api/schedule';

export default Vue.extend({
  props: {
    isNext: {
      type: Boolean,
      default: false,
    },
    marathonId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isLoading: true,
    };
  },
  async fetch(): Promise<void> {
    await Promise.allSettled([
      this.getScheduleTicker(this.marathonId),
    ]);
  },
  computed: {
    linkedRun(): string {
      return this.isNext ? '#next' : '#current';
    },
    messageClass(): string {
      return this.isNext ? '' : 'is-primary';
    },
    messageHeaderTitle(): string {
      return this.isNext ? 'marathon.schedule.nextRun' : 'marathon.schedule.currentRun';
    },
    messageHeaderArgs(): { duration?: string } {
      return this.isNext ? { duration: this.$temporal.distance.format(this.ticker?.date ?? new Date()) } : { };
    },
    tickers(): ScheduleTicker|undefined {
      return (this.$store.state.api.schedule as ScheduleState).tickers[this.marathonId];
    },
    ticker(): ScheduleLine|undefined {
      return this.isNext ? this.tickers?.next : this.tickers?.current;
    },
  },
  methods: {
    ...mapActions({
      getScheduleTicker: 'api/schedule/ticker',
    }),
  },
});
</script>

<style lang="scss" scoped>
  .message {
    margin-block-end: 0;
  }

  .message-header {
    // XXX Fixes an issue with Safari renderering not underscoring beneath the word-spacing pixels
    // Doesn't seem to affect other underlined sources. Should be tested and removed when possible
    word-spacing: 0;
  }

  .run-info > span:not(:last-of-type)::after {
    content: '-';
  }

  .runner-info > span:not(:last-of-type)::after {
    content: ', ';
  }
</style>
