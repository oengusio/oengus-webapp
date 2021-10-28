<template>
  <Component :is="connectionMeta.link ? 'a' : 'div'" :href="connectionMeta.link" target="_blank" class="social-link-container">
    <p>{{ connectionMeta.header || connection.platform }}</p>
    <FontAwesomeIcon :icon="connectionMeta.icon" class="icon fa-6x" />
    <p>{{ connection.username }}</p>
  </Component>
</template>

<script lang="ts">
import Vue from 'vue';
import { Connection, ConnectionMeta, ConnectionMetas } from '~/types/api/user';

export default Vue.extend({
  props: {
    connection: {
      type: Object as () => Connection,
      default: undefined,
    },
  },

  computed: {
    connectionMeta(): ConnectionMeta {
      const connectionMeta = connectionMetas[this.connection?.platform] ?? connectionMetas._DEFAULT;
      connectionMeta.link = connectionMeta.linkBase?.(this.connection.username);
      return connectionMeta;
    },
  },
});

const connectionMetas: ConnectionMetas&{ _DEFAULT: ConnectionMeta } = {
  DISCORD: {
    icon: [ 'fab', 'discord' ],
  },
  EMAIL: {
    linkBase: fragment => `mailto:${fragment}`,
    icon: [ 'fas', 'envelope' ],
  },
  FACEBOOK: {
    linkBase: fragment => `https://www.facebook.com/${fragment}`,
    icon: [ 'fab', 'facebook-f' ],
  },
  INSTAGRAM: {
    linkBase: fragment => `https://www.instagram.com/${fragment}`,
    icon: [ 'fab', 'instagram' ],
  },
  PHONE: {
    linkBase: fragment => `tel:${fragment}`,
    icon: [ 'fas', 'phone' ],
  },
  NICO: {
    linkBase: fragment => `https://com.nicovideo.jp/community/${fragment}`,
    icon: [ 'fas', 'tv' ],
  },
  SNAPCHAT: {
    linkBase: fragment => `https://www.snapchat.com/add/${fragment}`,
    icon: [ 'fab', 'snapchat-ghost' ],
  },
  SPEEDRUNCOM: {
    linkBase: fragment => `https://speedrun.com/user/${fragment}`,
    icon: [ 'fas', 'trophy' ],
  },
  TWITCH: {
    linkBase: fragment => `https://www.twitch.tv/${fragment}`,
    icon: [ 'fab', 'twitch' ],
  },
  TWITTER: {
    linkBase: fragment => `https://www.twitter.com/${fragment}`,
    icon: [ 'fab', 'twitter' ],
  },

  _DEFAULT: {
    icon: [ 'fas', 'star' ],
  },
};
</script>

<style lang="scss" scoped>
.social-link-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: var(--spacing);
}
</style>
