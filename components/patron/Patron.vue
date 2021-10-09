<template>
  <div class="box">
    <h3 class="title is-3">
      {{ $t('patrons.title') }}
    </h3>
    <p>{{ $t('patrons.par1') }}</p>
    <p v-html="$t('patrons.par2')" />
    <br>
    <div v-if="patrons" class="tags">
      <template v-if="patrons.length">
        <a v-for="patron in patrons" :key="patron.id" :href="`https://www.patreon.com/user?u=${patron.id}`" class="tag is-primary" target="_blank">
          {{ patron.full_name }}
        </a>
      </template>
      <span v-else v-html="$t('patrons.noPatrons')" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { PatreonState, Patron } from '~/types/api/patreon';

export default Vue.extend({
  async fetch(): Promise<void> {
    await Promise.allSettled([
      this.getPatrons(),
    ]);
  },
  computed: {
    patrons(): Array<Patron>|undefined {
      return (this.$store.state.api.patreon as PatreonState).patrons?.patrons;
    },
  },
  methods: {
    ...mapActions({
      getPatrons: 'api/patreon/patrons',
    }),
  },
});
</script>
