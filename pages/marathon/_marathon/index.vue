<template>
  <div>
    <MarathonDescription v-if="marathonData" :description="marathonData.description" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { FullMarathon, MarathonState } from '~/types/api/marathon';

export default Vue.extend({
  data() {
    return {
      marathon: this.$route.params.marathon,
    };
  },
  async fetch(): Promise<void> {
    await Promise.allSettled([
      this.getMarathon(this.marathon),
    ]);
  },
  computed: {
    marathonData(): FullMarathon|undefined {
      return (this.$store.state.api.marathon as MarathonState).marathons[this.marathon];
    },
  },
  methods: {
    ...mapActions({
      getMarathon: 'api/marathon/get',
    }),
  },
});
</script>
