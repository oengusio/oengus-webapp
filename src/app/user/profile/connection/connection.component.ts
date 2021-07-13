import {Component, Input, OnInit} from '@angular/core';
import { faTwitch, faTwitter, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faAngleDown, faTrophy } from '@fortawesome/free-solid-svg-icons';
import SocialAccount from '../../../../model/social-account';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent implements OnInit {

  @Input() connection: SocialAccount;

  public platformMap = {
    'DISCORD': faDiscord,
    'TWITTER': faTwitter,
    'TWITCH': faTwitch,
    'SPEEDRUNCOM': faTrophy,
  };

  constructor() { }

  ngOnInit(): void {
  }

  get profileLink(): string {
    switch (this.connection.platform) {
      case 'TWITCH':
        return `https://www.twitch.tv/${this.connection.username}`;
      case 'TWITTER':
        return `https://www.twitter.com/${this.connection.username}`;
      case 'SPEEDRUNCOM':
        return `https://speedrun.com/user/${this.connection.username}`;
      default:
        return 'https://patreon.com/oengusio';
    }
  }

}
