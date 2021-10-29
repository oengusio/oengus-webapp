<template>
  <div class="history-container">
    <div class="tabs is-boxed">
      <ul>
        <li :class="isActiveClass(submissionTab)">
          <ElementLink :to="{ query: { ...$route.query, [tabQuery]: submissionTab } }">
            {{ $t('user.profile.submissions') }}
          </ElementLink>
        </li>
        <li :class="isActiveClass(moderationTab)">
          <ElementLink :to="{ query: { ...$route.query, [tabQuery]: moderationTab } }">
            {{ $t('user.profile.moderator') }}
          </ElementLink>
        </li>
      </ul>
    </div>
    <div class="history-view-container">
      <UserHistorySubmission v-show="isActive(submissionTab)" :user-id="userId" />
      <UserHistoryModeration v-show="isActive(moderationTab)" :user-id="userId" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { IsActive } from '~/types/components/is-active';

export default Vue.extend({
  props: {
    userId: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      tabQuery: 'user-history',
      submissionTab: 'submission',
      moderationTab: 'moderation',
    };
  },

  computed: {
    activeTab(): string|Array<string|null> {
      return this.$route.query[this.tabQuery] ?? this.submissionTab;
    },
  },

  methods: {
    isActive(tabName: string): boolean {
      return this.activeTab === tabName;
    },
    isActiveClass(tabName: string): IsActive {
      return {
        'is-active': this.activeTab === tabName,
      };
    },
  },
});
</script>

<style lang="scss" scoped>
@use '~bulmaswatch/solar/variables' as solar;

.history-container {
  padding-block: var(--spacing);
}

.tabs {
  margin: 0;

  li a {
    background-color: solar.$grey-dark;
  }

  li.is-active a {
    color: solar.$yellow-invert;
    background-color: solar.$yellow;
  }
}

.history-view-container {
  border-color: solar.$grey-dark;
  border-style: solid;
  border-width: 0 2px 2px;
  padding: var(--spacing);
}
</style>
