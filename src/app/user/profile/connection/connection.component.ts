import {Component, Input, OnInit} from '@angular/core';
import {
  faTwitch,
  faTwitter,
  faDiscord,
  faInstagram,
  faFacebookF,
  faSnapchatGhost,
  faMastodon
} from '@fortawesome/free-brands-svg-icons';
import { faTrophy, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { SocialAccount } from '../../../../model/social-account';
import { SocialPlatform } from '../../../../model/social-platform';
import { parseMastodonUrl } from '../../../../utils/helpers';

@Component({
    selector: 'app-connection',
    templateUrl: './connection.component.html',
    styleUrls: ['./connection.component.scss'],
    standalone: false
})
export class ConnectionComponent implements OnInit {

  @Input() connection: SocialAccount;

  public platformMap = {
    'SPEEDRUNCOM': faTrophy,
    'MASTODON': faMastodon,
    'TWITTER': faTwitter,
    'TWITCH': faTwitch,
    'FACEBOOK': faFacebookF,
    'INSTAGRAM': faInstagram,
    'SNAPCHAT': faSnapchatGhost,
    'DISCORD': faDiscord,
    'EMAIL': faEnvelope,
    'PHONE': faPhone,
  };

  constructor() { }

  ngOnInit(): void {
  }

  get profileLink(): string {
    if (this.connection.platform === 'MASTODON') {
      return parseMastodonUrl(this.connection.username);
    }

    const urlPrefix = SocialPlatform[this.connection.platform];

    if (!urlPrefix) {
      return 'https://patreon.com/oengusio';
    }

    return `${urlPrefix}${this.connection.username}`;
  }

}
