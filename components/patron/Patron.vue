<template>
  <div class="box">
    <h3 class="title is-3">
      {{ $t('patrons.title') }}
    </h3>
    <p>{{ $t('patrons.par1') }}</p>
    <p v-html="$t('patrons.par2')" />
    <br>
    <div v-if="patrons" class="field is-grouped is-grouped-multiline">
      <template v-if="patrons.length">
        <div v-for="patron in patrons" :key="patron.id" class="tags has-addons">
          <div class="avatar tag is-primary">
            <img :src="patron.image_url">
          </div>
          <a :href="`https://www.patreon.com/user?u=${patron.id}`" target="_blank" class="tag is-primary is-large">
            {{ patron.full_name }}
          </a>
        </div>
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

<style lang="scss" scoped>
// Make sure there's some space around each patron
.is-grouped-multiline {
  gap: 1rem;

  > * {
    margin: 0;
  }
}

// Adapted (heavily) from https://codepen.io/datchley/pen/joZvEx
.avatar {
  display: flex;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 0;

  > img {
    width: auto;
    max-width: 100%;
    height: auto;
    max-height: 100%;
  }
}
</style>
