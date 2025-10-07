import { Component, Input, OnInit, inject } from '@angular/core';
import { Marathon } from '../../../../model/marathon';
import { UserService } from '../../../../services/user.service';
import { MarathonService } from '../../../../services/marathon.service';

@Component({
    selector: 'app-home-submit-button',
    templateUrl: './home-submit-button.component.html',
    styleUrls: ['./home-submit-button.component.scss'],
    standalone: false
})
export class HomeSubmitButtonComponent implements OnInit {
  private userService = inject(UserService);
  private marathonService = inject(MarathonService);

  @Input() marathon: Marathon;

  ngOnInit(): void {
  }

  get loggedIn(): boolean {
    return !!this.userService.user;
  }

  get archived(): boolean {
    return this.marathonService.isArchived();
  }
}
