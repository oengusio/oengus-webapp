<template>
  <ClientOnly>
    <div id="twitch-player" />
    <template #placeholder>
      <WidgetLoading />
    </template>
  </ClientOnly>
</template>

<script lang="ts">
import Vue from 'vue';

interface TwitchEmbedOptions {
  channel?: string;
  collection?: string|{ collection: string, video?: string };
  video?: string;
  /** Accepts sizes in pixels (e.g. 400) or percentages as strings (e.g. '50%') */
  height?: number|string;
  /** Accepts sizes in pixels (e.g. 400) or percentages as strings (e.g. '50%') */
  width?: number|string;
  layout?: 'video-with-chat'|'video';
  allowFullscreen?: boolean;
  autoplay?: boolean;
  muted?: boolean;
  theme?: 'light'|'dark';
  /** Accepts time in the format of HhMmSs, e.g. 3h12m7s. */
  time?: string;
  /** An array of domain names (protocol not included, Twitch requires https anyways) */
  parent?: Array<string>;
}
interface TwitchEmbed {
  new(id: string, options?: TwitchEmbedOptions): TwitchEmbed;
}
declare const Twitch: { Embed: TwitchEmbed };

export default Vue.extend({
  props: {
    /** Loads this channel with chat */
    channel: {
      type: String,
      default: undefined,
    },
    /** Loads the given video, possibly as part of a `collection`. Fails if `channel` is set */
    video: {
      type: String,
      default: undefined,
    },
    /** Loads the given collection, possibily at a specific `video`. Fails is `channel` is set */
    collection: {
      type: String,
      default: undefined,
    },
    /** Should the video start playing without user interaction (desktop only) */
    autoplay: {
      type: Boolean,
      default: false,
    },
  },

  mounted(): void {
    if (!this.channel && !this.video) {
      return;
    } else if (Object.prototype.hasOwnProperty.call(globalThis, 'Twitch')) {
      // We already have Twitch loaded, so don't load it again
      this.loadVideo();
      return;
    }

    const twitchEmbed = document.createElement('script');
    twitchEmbed.src = 'https://embed.twitch.tv/embed/v1.js';
    twitchEmbed.addEventListener('load', () => this.loadVideo());
    document.body.appendChild(twitchEmbed);
  },

  methods: {
    loadVideo(attempts = 0): void {
      if (!Object.prototype.hasOwnProperty.call(globalThis, 'Twitch')) {
        return;
      } else if (!document.getElementById('twitch-player')) {
        // Sometimes the widget isn't fully in DOM when this called, try 10 times
        if (attempts >= 10) {
          return;
        }
        requestAnimationFrame(() => this.loadVideo(attempts + 1));
        return;
      }

      const options: TwitchEmbedOptions = {
        width: '100%',
        height: '100%',
        autoplay: this.autoplay,
        layout: 'video',
      };
      if (this.channel) {
        options.channel = this.channel;
        options.layout = 'video-with-chat';
      } else if (this.collection) {
        options.collection = this.video ? { collection: this.collection, video: this.video } : this.collection;
      } else if (this.video) {
        options.video = this.video;
      } else {
        // I'm sorry, you have to load SOMETHING. This shouldn't happen but it's here to prevent freakouts
        return;
      }
      /* eslint-disable-next-line no-new */
      new Twitch.Embed('twitch-player', options);
    },
  },
});
</script>

<style lang="scss" scoped>
.twitch-player {
  width: 100%;
  min-width: 340px !important;
  height: 100%;
  min-height: 400px !important;
}
</style>
