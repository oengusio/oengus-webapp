<template>
  <div v-if="marathon.hasDonations || marathon.hasIncentives" :class="{ collapsed }">
    <p class="menu-label">
      {{ $t('marathon.menu.tracker') }}
    </p>
    <ul class="menu-list">
      <li v-if="acceptingDonations" :title="$t('marathon.menu.donate')">
        <ElementLink :to="`/marathon/${marathonId}/donate`" class="menu-item-link">
          <FontAwesomeIcon class="menu-item-icon" :icon="[ 'fas', 'donate' ]" />
          <span class="menu-item-label">
            {{ $t('marathon.menu.donate') }}
          </span>
        </ElementLink>
      </li>
      <li v-if="marathon.hasDonations" :title="$t('marathon.menu.donations')">
        <ElementLink :to="`/marathon/${marathonId}/donations`" class="menu-item-link">
          <FontAwesomeIcon class="menu-item-icon" :icon="[ 'fas', 'money-bill' ]" />
          <span class="menu-item-label">
            {{ $t('marathon.menu.donations') }}
          </span>
        </ElementLink>
      </li>
      <li v-if="marathon.hasIncentives" :title="$t('marathon.menu.incentives')">
        <ElementLink :to="`/marathon/${marathonId}/incentives`" class="menu-item-link">
          <FontAwesomeIcon class="menu-item-icon" :icon="[ 'fas', 'bullseye' ]" />
          <span class="menu-item-label">
            {{ $t('marathon.menu.incentives') }}
          </span>
        </ElementLink>
      </li>
    </ul>
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
    collapsed: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      shouldShowRedirectLinks: !this.$config.env.DOMAIN_V1,
    };
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
    acceptingDonations(): boolean {
      if (!this.marathon) {
        return false;
      }

      const start = new Date(this.marathon.startDate).getTime();
      const end = new Date(this.marathon.endDate).getTime();
      const now = Date.now();
      return this.marathon.hasDonations && this.marathon.donationsOpen && (start <= now && now <= end);
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
  display: flex;
  justify-content: flex-start;
  justify-content: start;
  align-items: center;
}

.menu-item-icon {
  min-width: 1.5em;
  margin-inline-end: 0.25em;
}

.collapsed {
  .menu-label,
  .menu-item-label {
    display: none;
  }

  .menu-item-icon {
    margin-inline-end: 0;
  }

  .menu-list {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
