import { Component, Input } from '@angular/core';
import { Marathon } from '../../../../model/marathon';
import { SocialPlatform } from '../../../../model/social-platform';
import { stripAtPrefix } from '../../../../model/social-account';
import { parseMastodonUrl } from '../../../../utils/helpers';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
    standalone: false
})
export class DetailsComponent {
  @Input() marathon: Marathon;

  get isLive(): boolean {
    if (!this.marathon) {
      return false;
    }

    const start = new Date(this.marathon.startDate).getTime();
    const end = new Date(this.marathon.endDate).getTime();
    const now = Date.now();
    return start <= now && now <= end;
  }

  get mastodonUrl(): string {
    if (!this.marathon || !this.marathon.mastodon) {
      return 'https://mas.to/@OengusIO';
    }

    const mastodonUrl = parseMastodonUrl(this.marathon.mastodon);

    return `${mastodonUrl}?utm_source=Oengus`;
  }

  get bskyUrl(): string {
    if (this.marathon.bluesky) {
      return `${SocialPlatform.BLUESKY}${stripAtPrefix(this.marathon.bluesky)}?utm_source=Oengus`;
    }

    return '';
  }

}
