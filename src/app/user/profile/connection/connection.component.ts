import {Component, Input, OnInit} from '@angular/core';
import {
  faTwitch,
  faTwitter,
  faDiscord,
  faInstagram,
  faFacebookF,
  faSnapchatGhost
} from '@fortawesome/free-brands-svg-icons';
import { faTrophy, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { SocialAccount } from '../../../../model/social-account';
import { SocialPlatform } from '../../../../model/social-platform';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent implements OnInit {

  @Input() connection: SocialAccount;

  public platformMap = {
    'SPEEDRUNCOM': faTrophy,
    'TWITTER': faTwitter,
    'TWITCH': faTwitch,
    'FACEBOOK': faFacebookF,
    'INSTAGRAM': faInstagram,
    'SNAPCHAT': faSnapchatGhost,
    'DISCORD': faDiscord,
    'EMAIL': faEnvelope,
    'PHONE': faPhone,
  };

  constructor() { }

  ngOnInit(): void {
  }

  get profileLink(): string {
    const urlPrefix = SocialPlatform[this.connection.platform];

    if (!urlPrefix) {
      return 'https://patreon.com/oengusio';
    }

    return `${urlPrefix}${this.connection.username}`;
  }

}
