<template>
  <div class="marathon-description-container">
    <ElementMarkdown v-if="description" :markdown="description" />
    <div class="is-centered">
      <WidgetLoading :while="[ marathon ]" />
    </div>
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
    description(): string|undefined {
      return this.marathon?.description;
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
.marathon-description-container {
  // Width of the screen minus the global "content padding"
  max-width: calc(100vw - 2em);
  // Allow users to view the whole thing anyways, but discourage it
  overflow-x: auto;
}
</style>
