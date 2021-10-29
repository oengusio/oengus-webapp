<template>
  <div v-show="!collapsed">
    <p class="menu-label">
      {{ $t('marathon.menu.moderators') }}
    </p>
    <ul class="menu-list">
      <li v-for="moderator of moderators" :key="moderator.id">
        <ElementLink :to="`/user/${moderator.username}`" class="menu-item-link">
          <User :user="moderator" />
        </ElementLink>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { FullMarathon, MarathonState } from '~/types/api/marathon';
import { User } from '~/types/api/user';

export default Vue.extend({
  props: {
    marathonId: {
      type: String,
      default: '',
    },
    collapsed: {
      type: Boolean,
      default: false,
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
    moderators(): Array<User> {
      const moderators = [ ...(this.marathon?.moderators ?? [ ]) ];
      const creator = this.marathon?.creator;
      // XXX Fix to prevent duplication. See https://github.com/esamarathon/oengusio/issues/129
      if (creator && moderators.every(moderator => moderator.id !== creator.id)) {
        moderators.unshift(creator);
      }
      return moderators;
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
.menu-item-link {
  padding-block: 0.25em;
}
</style>
