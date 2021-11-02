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

      <template v-for="(marathon, marathonIndex) in moderatedMarathons">
        <ElementTableCell :key="`marathon-${marathonIndex}`" class="marathon" :class="getRowParity(marathonIndex)">
          <ElementLink :to="`/marathon/${marathon.id}`">
            {{ marathon.name }}
          </ElementLink>
        </ElementTableCell>
        <ElementTableCell :key="`date-${marathonIndex}`" class="date" :class="getRowParity(marathonIndex)">
          <ElementTemporalDateTime :datetime="marathon.startDate" format="mediumDateTime" />
          (<ElementTemporalDistance :datetime="marathon.startDate" />)
        </ElementTableCell>
      </template>
    </ElementTable>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
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
    getRowParity(marathonIndex: number): { 'is-even': boolean, 'is-odd': boolean } {
      return {
        'is-even': marathonIndex % 2 === 0,
        'is-odd': marathonIndex % 2 === 1,
      };
    },
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

<!-- Temporary language info to avoid having the i18n string -->
<i18n>
{
  "en-GB": {
    "marathon": {
      "submissions": {
        "table": {
          "date": "Date"
        }
      }
    }
  }
}
</i18n>
