import { Component, Input } from '@angular/core';
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
    'SPEEDRUNCOM': 'fa-regular fa-trophy',
    'MASTODON': 'fa-brands fa-mastodon',
    'TWITTER': 'fa-brands fa-twitter',
    'TWITCH': 'fa-brands fa-twitch',
    'FACEBOOK': 'fa-brands fa-facebook-f',
    'INSTAGRAM': 'fa-brands fa-instagram',
    'SNAPCHAT': 'fa-brands fa-snapchat-ghost',
    'DISCORD': 'fa-brands fa-discord',
    'EMAIL': 'fa-solid fa-envelope',
    'PHONE': 'fa-solid fa-phone',
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
