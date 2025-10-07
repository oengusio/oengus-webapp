import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { SelfUser } from '../../../../model/user';

@Component({
    selector: 'app-header-bar-user',
    templateUrl: './header-bar-user.component.html',
    styleUrls: ['./header-bar-user.component.scss'],
    standalone: false
})
export class HeaderBarUserComponent implements OnInit {
  userService = inject(UserService);


  ngOnInit(): void {
  }

  get user(): SelfUser {
    return this.userService.user;
  }
}
