import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { SocialAccount } from '../../../../model/social-account';
import { SocialPlatform } from '../../../../model/social-platform';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-connection-settings',
  templateUrl: './connection-settings.component.html',
  styleUrls: ['./connection-settings.component.scss']
})
export class ConnectionSettingsComponent implements OnInit {
  @Input() public connection: SocialAccount;
  @Input() public discordId: number;
  @Input() public twitchId: string;

  @Output() public deleteSelf = new EventEmitter<void>();

  public faTrash = faTrash;
  public platforms = SocialPlatform;

  constructor() { }

  ngOnInit() {
    //
  }

  get disabled(): boolean {
    const type = this.connection.platform;

    return Boolean(
      (type === 'DISCORD' && this.discordId) ||
      (type === 'TWITCH' && this.twitchId)
    );
  }

  get profileLink(): string {
    const type = this.connection.platform;

    if (type === 'MASTODON') {
      const [username, platform] = this.connection.username.split('@');

      return `https://${platform}/${username}`;
    }

    return SocialPlatform[type] + this.connection.username;
  }

  get parsedPlatforms(): { [key: string]: { url: string, disabled: boolean } } {
    const cloned = {};

    for (const key of Object.keys(SocialPlatform)) {
      cloned[key] = {
        disabled: false,
        url: cloned[key]
      };

      if (key === 'DISCORD' && this.discordId) {
        cloned[key].disabled = true;
      } else if (key === 'TWITCH' && this.twitchId) {
        cloned[key].disabled = true;
      }
    }

    return cloned;
  }
}
