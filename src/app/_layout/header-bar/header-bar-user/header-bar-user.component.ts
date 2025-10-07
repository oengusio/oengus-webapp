import { Component, inject } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { SelfUser } from '../../../../model/user';

@Component({
    selector: 'app-header-bar-user',
    templateUrl: './header-bar-user.component.html',
    styleUrls: ['./header-bar-user.component.scss'],
    standalone: false
})
export class HeaderBarUserComponent {
  userService = inject(UserService);

  get user(): SelfUser {
    return this.userService.user;
  }
}
