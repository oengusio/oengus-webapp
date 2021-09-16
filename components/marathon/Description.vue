<template>
  <ElementMarkdown v-if="description" :markdown="description" />
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { MarathonState } from '~/types/api/marathon';

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
    description(): string|undefined {
      return (this.$store.state.api.marathon as MarathonState).marathons[this.marathonId]?.description;
    },
  },
  methods: {
    ...mapActions({
      getMarathon: 'api/marathon/get',
    }),
  },
});
</script>
