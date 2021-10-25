<template>
  <div class="box user-profile-container">
    <div>
      <img :src="userProfileURL" alt="Profile image">
    </div>

    <template v-if="user && !user._fetching">
      <div class="user-address">
        <h3 class="title is-3 username">
          <User :user="user" />
        </h3>
        <span class="tags">
          <span v-for="pronoun of user.pronouns" :key="pronoun" class="tag is-info">
            {{ pronoun }}
          </span>
        </span>
      </div>

      <div v-if="user.country" class="user-location">
        <span class="icon flag-icon" :class="`flag-icon-${user.country.toLowerCase()}`" />
        <span>
          {{ $t(`country.${user.country}`) }}
        </span>
      </div>

      <div v-if="user.languagesSpoken.length">
        <span>
          {{ $t('user.profile.speak') }}
        </span>
        <span v-for="language of user.languagesSpoken" :key="language" class="language-spoken">{{ $t(`language.${language}`) }}</span>
      </div>
    </template>
    <WidgetLoading :while="[ user ]" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { OengusAPI } from '~/plugins/oengus';
import { User, UserState } from '~/types/api/user';

export default Vue.extend({
  props: {
    userId: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      userProfileURL: OengusAPI.getRoute({ basePath: 'users', id: this.userId, path: 'avatar', fullURL: true }),
    };
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
  },

  methods: {
    ...mapActions({
      getUser: 'api/user/get',
    }),
  },
});
</script>

<style lang="scss" scoped>
.user-profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-address {
  display: flex;
  gap: var(--spacing);
  align-items: center;
  margin-block-end: var(--spacing);

  > .username {
    margin: 0;
  }
}

.user-location {
  display: flex;
  align-items: center;
  gap: calc(var(--spacing) / 2);
}

.language-spoken:not(:last-of-type) {
  margin-inline-end: 0.25em;

  &::after {
    content: ',';
  }
}
</style>
