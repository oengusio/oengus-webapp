import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Marathon } from '../../../../model/marathon';
import { faDiscord, faMastodon, faTwitch, faTwitter, faYoutube, faBluesky } from '@fortawesome/free-brands-svg-icons';
import { faComputer } from '@fortawesome/free-solid-svg-icons';
import { SocialPlatform } from '../../../../model/social-platform';
import { stripAtPrefix } from '../../../../model/social-account';
import { parseMastodonUrl } from '../../../../utils/helpers';
import { ElementTemporalDatetimeComponent } from '../../../elements/temporal/element-temporal-datetime/element-temporal-datetime.component';
import { MarathonLocationComponent } from '../../../elements/marathon-location/marathon-location.component';
import { ElementTwitchPlayerComponent } from '../../../elements/element-twitch-player/element-twitch-player.component';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
    imports: [
        CommonModule,
        TranslateModule,
        FontAwesomeModule,
        ElementTemporalDatetimeComponent,
        MarathonLocationComponent,
        ElementTwitchPlayerComponent,
    ]
})
export class DetailsComponent {
  @Input() marathon: Marathon;

  public faTwitch = faTwitch;
  public faTwitter = faTwitter;
  public faMastodon = faMastodon;
  public faBluesky = faBluesky;
  public faDiscord = faDiscord;
  public faYoutube = faYoutube;
  public faComputer = faComputer;

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
