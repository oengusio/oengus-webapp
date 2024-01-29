import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-header-bar-verify-email',
  templateUrl: './header-bar-verify-email.component.html',
  styleUrls: ['./header-bar-verify-email.component.scss']
})
export class HeaderBarVerifyEmailComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  get show(): boolean {
    return this.userService.user && !this.userService.user.emailVerified;
  }

}
