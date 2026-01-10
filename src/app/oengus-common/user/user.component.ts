import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LocalizeRouterModule } from '@oengusio/ngx-translate-router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { User } from '../../../model/user';
import { faTwitch, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { SocialAccount } from '../../../model/social-account';
import { SocialPlatform } from '../../../model/social-platform';

/**
 * @deprecated Please switch to app-user-link instead.
 */
@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
    imports: [
        CommonModule,
        RouterModule,
        LocalizeRouterModule,
        FontAwesomeModule,
    ]
})
export class UserComponent {

  @Input() username?: string;
  @Input() user?: User;
  @Input() showSocialLinks = false;
  @Input() showProfileLink = true;

  private readonly acceptedTypes = ['TWITTER', 'TWITCH', 'SPEEDRUNCOM'];
  public platforms = SocialPlatform;
  public iconMapping = {
    'TWITCH': faTwitch,
    'TWITTER': faTwitter,
    'SPEEDRUNCOM': faTrophy,
  };

  public localStorage = localStorage;

  get profileConnections(): SocialAccount[] {
    return this.user.connections.filter((connection) => this.acceptedTypes.includes(connection.platform));
  }

}
