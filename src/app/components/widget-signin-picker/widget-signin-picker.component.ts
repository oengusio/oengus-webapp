import { Component, HostBinding, inject, Input } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-widget-signin-picker',
    templateUrl: './widget-signin-picker.component.html',
    styleUrls: ['./widget-signin-picker.component.scss'],
    standalone: false
})
export class WidgetSigninPickerComponent {
  authService = inject(AuthService);

  @Input() type: 'DROPDOWN' | 'NAVBAR' = 'DROPDOWN';
  @Input() isRight = false;

  @HostBinding('class.navbar-item') get navbar() { return this.type === 'NAVBAR'; }

  get dropdownItemClass(): string {
    return /^navbar$/i.test(this.type) ? 'navbar-item' : 'dropdown-item';
  }

  storeCurrentPage(): boolean {
    // We store pathname because "403" can be inserted if a user is not logged in
    localStorage.setItem('prev_loc', window.location.pathname);
    return true;
  }

}
