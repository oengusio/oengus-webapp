<template>
  <div v-if="ticker">
    <div class="message" :class="messageClass">
      <div class="message-header">
        <NuxtLink :to="linkedRun">
          {{ $t(messageHeaderTitle, messageHeaderArgs) }}
        </NuxtLink>
      </div>
      <div class="message-body">
        <p class="run-info">
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { ScheduleLine, ScheduleState } from '~/types/api/schedule';

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
    ticker(): ScheduleLine|undefined {
      const tickers = (this.$store.state.api.schedule as ScheduleState).tickers[this.marathonId];
      return this.isNext ? tickers?.next : tickers?.current;
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
  .run-info > span:not(:last-of-type)::after {
    content: '-';
  }

  .runner-info > span:not(:last-of-type)::after {
    content: ', ';
  }
</style>
