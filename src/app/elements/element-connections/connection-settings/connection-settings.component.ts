import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConnectionMeta, connectionMetas, SocialAccount } from '../../../../model/social-account';
import { SocialPlatform, SocialPlatformName } from '../../../../model/social-platform';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-connection-settings',
    templateUrl: './connection-settings.component.html',
    styleUrls: ['./connection-settings.component.scss'],
    standalone: false
})
export class ConnectionSettingsComponent {
  @Input() public connection: SocialAccount;
  @Input() public discordId: string;
  @Input() public twitchId: string;

  @Output() public deleteSelf = new EventEmitter<void>();

  public faTrash = faTrash;
  public platforms = SocialPlatform;

  get disabled(): boolean {
    const type = this.connection.platform as SocialPlatformName;

    return Boolean(
      (type === 'DISCORD' && this.discordId) ||
      (type === 'TWITCH' && this.twitchId),
    );
  }

  get connectionMeta(): ConnectionMeta | null {
    return connectionMetas[this.connection.platform ?? '_DEFAULT'];
  }

  get profileLink(): string {
    return this.connectionMeta?.linkBase?.(this.connection.username) ?? '';
  }

  get parsedPlatforms(): Record<string, { url: string, disabled: boolean }> {
    const cloned = {};

    for (const key of Object.keys(SocialPlatform)) {
      cloned[key] = {
        disabled: false,
        url: cloned[key],
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
