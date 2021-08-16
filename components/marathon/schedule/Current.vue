<template>
  <div>
    <div class="message" :class="messageClass">
      <div class="message-header">
        {{ $t(messageHeaderTitle, messageHeaderArgs) }}
      </div>
      <div class="message-body">
        Run information here
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    isNext: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    messageClass(): string {
      return this.isNext ? '' : 'is-primary';
    },
    messageHeaderTitle(): string {
      return this.isNext ? 'marathon.schedule.nextRun' : 'marathon.schedule.currentRun';
    },
    messageHeaderArgs(): { duration?: string } {
      return this.isNext ? { duration: 'SOON' } : { };
    },
  },
});
</script>
