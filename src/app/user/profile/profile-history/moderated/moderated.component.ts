import { Component, Input, OnInit } from '@angular/core';
import { UserProfile } from '../../../../../model/user-profile';
import { getRowParity } from '../../../../../assets/table';

@Component({
  selector: 'app-user-profile-moderated-history',
  templateUrl: './moderated.component.html',
  styleUrls: ['./moderated.component.scss']
})
export class ModeratedComponent implements OnInit {
  @Input() user: UserProfile;

  getRowParity = getRowParity;

  constructor() { }

  ngOnInit(): void {
  }

  get moderatedMarathons() {
    return [ ...this.user.moderatedMarathons ].reverse();
  }

}
