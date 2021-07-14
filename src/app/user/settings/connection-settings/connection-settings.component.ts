import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import SocialAccount from '../../../../model/social-account';
import SocialPlatform from '../../../../model/social-platform';

@Component({
  selector: 'app-connection-settings',
  templateUrl: './connection-settings.component.html',
  styleUrls: ['./connection-settings.component.scss']
})
export class ConnectionSettingsComponent implements OnInit {
  @Input() public connection: SocialAccount;
  @Input() public discordId: string;
  @Input() public twitchId: string;
  @Input() public twitterId: string;

  @Output() public deleteSelf = new EventEmitter<void>();

  public disabled = false;

  constructor() { }

  ngOnInit() {
    const type = this.connection.platform;

    /*this.disabled = Boolean(
      (type === 'DISCORD' && this.discordId) ||
      (type === 'TWITCH' && this.twitchId) ||
      (type === 'TWITTER' && this.twitterId)
    );*/
  }

  get platforms() {
    const data = {};

    for (const platform of Object.keys(SocialPlatform)) {
      data[platform] = SocialPlatform[platform];
    }

    return data;
  }

}
