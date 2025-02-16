import { Component, Input } from '@angular/core';
import { UserProfile } from '../../../../model/user-profile';

@Component({
    selector: 'app-user-social',
    templateUrl: './user-social.component.html',
    styleUrls: ['./user-social.component.scss'],
    standalone: false
})
export class UserSocialComponent {
  @Input() user: UserProfile;
}
