import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faBluesky, faDiscord, faFacebookF, faInstagram, faMastodon, faSnapchatGhost, faTwitch, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { ConnectionPlatform, SocialAccount } from '../../../../model/social-account';
import { SocialPlatform } from '../../../../model/social-platform';
import { parseMastodonUrl } from '../../../../utils/helpers';
import { speedrunsMeIcon } from '../../../../assets/icons/speedrunsme';

@Component({
    selector: 'app-connection',
    templateUrl: './connection.component.html',
    styleUrls: ['./connection.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        CommonModule,
        RouterModule,
        FontAwesomeModule,
    ]
})
export class ConnectionComponent {

  // @ts-expect-error meh.
  @Input() connection: SocialAccount;

  public platformMap: Record<ConnectionPlatform, IconDefinition> = {
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
    BLUESKY: faBluesky,
    NICO: faBluesky,
    YOUTUBE: faYoutube,
    SPEEDRUNSME: speedrunsMeIcon,
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
