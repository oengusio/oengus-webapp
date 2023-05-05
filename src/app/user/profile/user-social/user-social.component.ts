import { Component, Input, OnInit } from '@angular/core';
import { UserProfile } from '../../../../model/user-profile';

@Component({
  selector: 'app-user-social',
  templateUrl: './user-social.component.html',
})
export class UserSocialComponent {
  @Input() user: UserProfile;
}
