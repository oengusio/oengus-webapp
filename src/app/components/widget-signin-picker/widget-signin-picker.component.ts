import { Component, Input } from '@angular/core';
import { faDiscord, faTwitch } from '@fortawesome/free-brands-svg-icons';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-widget-signin-picker',
  templateUrl: './widget-signin-picker.component.html',
  styleUrls: ['./widget-signin-picker.component.scss'],
})
export class WidgetSigninPickerComponent {
  @Input() type: 'DROPDOWN' | 'NAVBAR' = 'DROPDOWN';
  @Input() isRight = false;

  iconDiscord = faDiscord;
  iconTwitch = faTwitch;
  iconLoginNew = faRightToBracket;

  constructor(public userService: UserService) { }

  get dropdownItemClass(): string {
    return /^navbar$/i.test(this.type) ? 'navbar-item' : 'dropdown-item';
  }

}
