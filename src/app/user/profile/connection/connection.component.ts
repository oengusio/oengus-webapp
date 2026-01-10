import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDiscord, faFacebookF, faInstagram, faMastodon, faSnapchatGhost, faTwitch, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { SocialAccount } from '../../../../model/social-account';
import { SocialPlatform } from '../../../../model/social-platform';
import { parseMastodonUrl } from '../../../../utils/helpers';

@Component({
    selector: 'app-connection',
    templateUrl: './connection.component.html',
    styleUrls: ['./connection.component.scss'],
    imports: [
        CommonModule,
        RouterModule,
        FontAwesomeModule,
    ]
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
