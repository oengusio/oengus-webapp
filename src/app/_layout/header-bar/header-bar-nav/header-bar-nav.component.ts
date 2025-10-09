import { Component, inject } from '@angular/core';
import { UserService } from '../../../../services/user.service';

@Component({
    selector: 'app-header-bar-nav',
    templateUrl: './header-bar-nav.component.html',
    styleUrls: ['./header-bar-nav.component.scss'],
    standalone: false
})
export class HeaderBarNavComponent {
  userService = inject(UserService);

  isNavbarActive = false;

  get isActiveClass() {
    return {
      'is-active': this.isNavbarActive,
    };
  }

  toggleNavbarActive(): void {
    this.isNavbarActive = !this.isNavbarActive;
  }
}
