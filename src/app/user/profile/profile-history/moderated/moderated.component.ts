import { Component, Input, OnInit } from '@angular/core';
import { UserProfile } from '../../../../../model/user-profile';

@Component({
  selector: 'app-user-profile-moderated-history',
  templateUrl: './moderated.component.html',
  styleUrls: ['./moderated.component.scss']
})
export class ModeratedComponent implements OnInit {
  @Input() user: UserProfile;

  constructor() { }

  ngOnInit(): void {
  }

}
