import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../model/user';

@Component({
  selector: 'app-header-bar-user',
  templateUrl: './header-bar-user.component.html',
  styleUrls: ['./header-bar-user.component.scss']
})
export class HeaderBarUserComponent implements OnInit {

  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }

  get user(): User {
    return this.userService.user;
  }
}
