import {Component, Input, OnInit} from '@angular/core';
import { faTwitch, faTwitter, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import SocialAccount from '../../../../model/social-account';
import SocialPlatform from '../../../../model/social-platform';

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
    const urlPrefix = SocialPlatform[this.connection.platform].urlPrefix;

    if (urlPrefix === null) {
      return 'https://patreon.com/oengusio';
    }

    return `${urlPrefix}${this.connection.username}`;
  }

}
