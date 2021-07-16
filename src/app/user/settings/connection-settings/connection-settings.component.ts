import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import SocialAccount from '../../../../model/social-account';
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
  @Input() public twitterId: string;

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
      (type === 'TWITCH' && this.twitchId) ||
      (type === 'TWITTER' && this.twitterId)
    );
  }
}
