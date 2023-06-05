import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { UserProfile } from '../../../../model/user-profile';
import { User } from '../../../../model/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  @Input() user: UserProfile;

  constructor() { }

  ngOnInit(): void {
  }

  get fakeUserModel(): User {
    // @ts-ignore
    return this.user as User;
  }

  get avatarUrl(): string {
    return `${environment.api}/v2/users/${this.user.username}/avatar`;
  }

}
