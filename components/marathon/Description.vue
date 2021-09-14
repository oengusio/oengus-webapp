<template>
  <ElementMarkdown v-if="description" :markdown="description" />
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { MarathonState } from '~/types/api/marathon';

export default Vue.extend({
  props: {
    marathon: {
      type: String,
      default: '',
    },
  },
  async fetch(): Promise<void> {
    await Promise.allSettled([
      this.getMarathon(this.marathon),
    ]);
  },
  computed: {
    description(): string|undefined {
      return (this.$store.state.api.marathon as MarathonState).marathons[this.marathon]?.description;
    },
  },
  methods: {
    ...mapActions({
      getMarathon: 'api/marathon/get',
    }),
  },
});
</script>
