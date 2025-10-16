import { Component, Input } from '@angular/core';
import { User } from '../../../model/user';
import { SocialAccount } from '../../../model/social-account';
import { SocialPlatform } from '../../../model/social-platform';

/**
 * @deprecated Please switch to app-user-link instead.
 */
@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
    standalone: false
})
export class UserComponent {

  @Input() username?: string;
  @Input() user?: User;
  @Input() showSocialLinks = false;
  @Input() showProfileLink = true;

  private readonly acceptedTypes = ['BLUESKY', 'TWITCH', 'SPEEDRUNCOM'];
  public platforms = SocialPlatform;
  public iconMapping = {
    'TWITCH': 'fa-brands fa-twitch',
    'BLUESKY': 'fa-brands fa-bluesky',
    'SPEEDRUNCOM': 'fa-solid fa-trophy',
  };

  public localStorage = localStorage;

  get profileConnections(): SocialAccount[] {
    return this.user.connections.filter((connection) => this.acceptedTypes.includes(connection.platform));
  }

}
