import { Component } from '@angular/core';
import { UserService } from '../../../../services/user.service';

@Component({
    selector: 'app-header-bar-display-name',
    templateUrl: './header-bar-display-name.component.html',
    styleUrls: ['./header-bar-display-name.component.scss'],
    standalone: false
})
export class HeaderBarDisplayNameComponent {

  constructor(private userService: UserService) { }

  get isMissingDisplayName(): boolean {
    return this.userService.user && !this.userService.user.displayName;
  }
}
