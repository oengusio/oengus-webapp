import { Component, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { UserProfile } from '../../../../model/user-profile';
import { User } from '../../../../model/user';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
    standalone: false
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
