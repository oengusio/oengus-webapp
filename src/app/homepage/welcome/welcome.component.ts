import { Component, inject } from '@angular/core';
import { faAngleDown, faCheck } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../../services/user.service';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-homepage-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss'],
    standalone: false
})
export class WelcomeComponent {
  userService = inject(UserService);

  faCheck = faCheck;
  faAngleDown = faAngleDown;
  isFoldOpen = false;
  sandbox = environment.sandbox;
  plannedFeatures = [
    { key: '1', complete: true },
    { key: '2', complete: false },
    { key: '3', complete: true },
    { key: '4', complete: false },
    { key: '5', complete: true },
    { key: '6', complete: false },
    { key: '7', complete: false },
    { key: 'volunteerManager', complete: false },
  ];

  openFold(): void {
    this.isFoldOpen = true;
  }
}
