<template>
  <div>
    <WidgetLoading :while="[ user ]" />
    <ElementTable v-show="moderatedMarathons" class="moderation-table">
      <ElementTableCell is-header class="marathon">
        {{ $t('marathon.submissions.table.marathon') }}
      </ElementTableCell>
      <ElementTableCell is-header class="date">
        {{ $t('marathon.submissions.table.date') }}
      </ElementTableCell>

      <UserHistoryModerationRow v-for="(marathon, index) in moderatedMarathons" :key="index" :marathon="marathon" :class="getRowParity(index)" />
    </ElementTable>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { getRowParity } from '~/assets/table';
import { Marathon } from '~/types/api/marathon';
import { User, UserState } from '~/types/api/user';

export default Vue.extend({
  props: {
    userId: {
      type: String,
      default: '',
    },
  },

  async fetch(): Promise<void> {
    await Promise.allSettled([
      this.getUser(this.userId),
    ]);
  },

  computed: {
    user(): User|undefined {
      return (this.$store.state.api.user as UserState).users[this.userId];
    },
    moderatedMarathons(): Array<Marathon>|undefined {
      // Flip the sort order in a way that won't upset Vuex
      let moderatedMarathons = this.user?.moderatedMarathons;
      if (moderatedMarathons) {
        moderatedMarathons = [ ...moderatedMarathons ].reverse();
      }
      return moderatedMarathons;
    },
  },

  methods: {
    getRowParity,
    ...mapActions({
      getUser: 'api/user/get',
    }),
  },
});
</script>

<style lang="scss" scoped>
.moderation-table {
  grid-template-columns: repeat(2, auto);
}
</style>
