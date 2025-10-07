import { Component, inject } from '@angular/core';
import { MarathonService } from '../../../services/marathon.service';
import { UserService } from '../../../services/user.service';
import { Marathon } from '../../../model/marathon';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false
})
export class HomeComponent {
  marathonService = inject(MarathonService);
  userService = inject(UserService);


  get marathon(): Marathon {
    return this.marathonService.marathon;
  }

}
