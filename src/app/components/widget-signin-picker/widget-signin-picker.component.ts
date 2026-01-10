import { Component, HostBinding, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDiscord, faTwitch } from '@fortawesome/free-brands-svg-icons';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../services/auth.service';
import { ElementModule } from '../../elements/elements.module';

@Component({
    selector: 'app-widget-signin-picker',
    templateUrl: './widget-signin-picker.component.html',
    styleUrls: ['./widget-signin-picker.component.scss'],
    imports: [
        CommonModule,
        RouterModule,
        TranslateModule,
        FontAwesomeModule,
        ElementModule,
    ]
})
export class WidgetSigninPickerComponent {
  authService = inject(AuthService);

  @Input() type: 'DROPDOWN' | 'NAVBAR' = 'DROPDOWN';
  @Input() isRight = false;

  @HostBinding('class.navbar-item') get navbar() { return this.type === 'NAVBAR'; }

  iconDiscord = faDiscord;
  iconTwitch = faTwitch;
  iconLoginNew = faRightToBracket;

  get dropdownItemClass(): string {
    return /^navbar$/i.test(this.type) ? 'navbar-item' : 'dropdown-item';
  }

  storeCurrentPage(): boolean {
    // We store pathname because "403" can be inserted if a user is not logged in
    localStorage.setItem('prev_loc', window.location.pathname);
    return true;
  }

}
