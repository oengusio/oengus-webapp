import { Component } from '@angular/core';
import { MarathonService } from '../../../services/marathon.service';
import { UserService } from '../../../services/user.service';
import { Marathon } from '../../../model/marathon';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(public marathonService: MarathonService,
              public userService: UserService) {
  }

  get marathon(): Marathon {
    return this.marathonService.marathon;
  }

}
