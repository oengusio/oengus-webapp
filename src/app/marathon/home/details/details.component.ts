import { Component, Input } from '@angular/core';
import { Marathon } from '../../../../model/marathon';
import { faDiscord, faMastodon, faTwitch, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faComputer } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
    standalone: false
})
export class DetailsComponent {
  @Input() marathon: Marathon;


  public faTwitch = faTwitch;
  public faTwitter = faTwitter;
  public faMastodon = faMastodon;
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

    const [ username, domain ] = this.marathon.mastodon.split('@');

    return `https://${domain}/@${username}`;
  }

}
