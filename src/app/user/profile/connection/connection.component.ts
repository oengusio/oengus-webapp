import { Component, Input } from '@angular/core';
import { faDiscord, faFacebookF, faInstagram, faMastodon, faSnapchatGhost, faTwitch, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { SocialAccount } from '../../../../model/social-account';
import { SocialPlatform } from '../../../../model/social-platform';
import { parseMastodonUrl } from '../../../../utils/helpers';

@Component({
    selector: 'app-connection',
    templateUrl: './connection.component.html',
    styleUrls: ['./connection.component.scss'],
    standalone: false
})
export class ConnectionComponent {

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
