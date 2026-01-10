import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';


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
  parent?: string[];
}

/*interface TwitchEmbed {
  new(id: string, options?: TwitchEmbedOptions): TwitchEmbed;
}*/

type TwitchEmbed = new(id: string, options?: TwitchEmbedOptions) => TwitchEmbed;

declare const Twitch: { Embed: TwitchEmbed };

@Component({
    selector: 'app-element-twitch-player',
    templateUrl: './element-twitch-player.component.html',
    styleUrls: ['./element-twitch-player.component.scss'],
    imports: [
        CommonModule,
    ]
})
export class ElementTwitchPlayerComponent implements OnInit {
  @Input() channel: string | null = null;
  @Input() video: string | null = null;
  @Input() collection: string | null = null;
  @Input() autoplay = false;

  ngOnInit(): void {
    if (!this.channel && !this.video) {
      return;
    }

    if (Object.prototype.hasOwnProperty.call(globalThis, 'Twitch')) {
      // We already have Twitch loaded, so don't load it again
      this.loadVideo();
      return;
    }

    const twitchEmbed = document.createElement('script');
    twitchEmbed.src = 'https://embed.twitch.tv/embed/v1.js';
    twitchEmbed.addEventListener('load', () => this.loadVideo());
    document.body.appendChild(twitchEmbed);
  }

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

       new Twitch.Embed('twitch-player', options);
  }

}
