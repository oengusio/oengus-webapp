import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LocalizeRouterModule } from '@oengusio/ngx-translate-router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { environment } from '../../../../environments/environment';
import { UserProfile } from '../../../../model/user-profile';
import { User } from '../../../../model/user';
import { UserLinkComponent } from '../../../elements/user-link/user-link.component';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
    imports: [
        CommonModule,
        RouterModule,
        LocalizeRouterModule,
        FontAwesomeModule,
        UserLinkComponent,
    ]
})
export class UserProfileComponent {
  @Input() user: UserProfile;

  get fakeUserModel(): User {
    // @ts-expect-error weird mapping that is valid
    return this.user as User;
  }

  get avatarUrl(): string {
    return `${environment.api}/v2/users/${this.user.username}/avatar`;
  }

}
