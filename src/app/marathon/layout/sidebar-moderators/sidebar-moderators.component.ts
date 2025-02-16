import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Marathon } from '../../../../model/marathon';
import { User } from '../../../../model/user';

@Component({
    selector: 'app-sidebar-moderators',
    templateUrl: './sidebar-moderators.component.html',
    styleUrls: ['./sidebar-moderators.component.scss'],
    standalone: false
})
export class SidebarModeratorsComponent implements OnInit {
  @Input() marathon: Marathon;
  @HostBinding('class.collapsed') @Input() collapsed = false;

  moderators: User[] = [];

  ngOnInit(): void {
    this.moderators.push(this.marathon.creator);
    this.moderators.push(...this.marathon.moderators);
  }

}
