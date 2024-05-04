import { Component, Input, OnInit } from '@angular/core';
import { Marathon } from '../../../../model/marathon';
import { UserService } from '../../../../services/user.service';
import { MarathonService } from '../../../../services/marathon.service';

@Component({
  selector: 'app-home-submit-button',
  templateUrl: './home-submit-button.component.html',
  styleUrls: ['./home-submit-button.component.scss']
})
export class HomeSubmitButtonComponent implements OnInit {
  @Input() marathon: Marathon;

  constructor(
    private userService: UserService,
    private marathonService: MarathonService,
  ) { }

  ngOnInit(): void {
  }

  get loggedIn(): boolean {
    return !!this.userService.user;
  }

  get archived(): boolean {
    return this.marathonService.isArchived();
  }
}
