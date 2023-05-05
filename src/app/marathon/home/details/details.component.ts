import { Component, Input, OnInit } from '@angular/core';
import { Marathon } from '../../../../model/marathon';
import { faDiscord, faTwitch, faTwitter, faYoutube, faMastodon } from '@fortawesome/free-brands-svg-icons';
import { faComputer } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  @Input() marathon: Marathon;


  public faTwitch = faTwitch;
  public faTwitter = faTwitter;
  public faMastodon = faMastodon;
  public faDiscord = faDiscord;
  public faYoutube = faYoutube;
  public faComputer = faComputer;

  constructor() { }

  ngOnInit(): void {
  }

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
      return 'https://speedrun.zone/@OengusIO';
    }

    const [ username, domain ] = this.marathon.mastodon.split('@');

    return `https://${domain}/@${username}`;
  }

}
