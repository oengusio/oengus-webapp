import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Marathon } from '../../../../model/marathon';

@Component({
  selector: 'app-sidebar-moderators',
  templateUrl: './sidebar-moderators.component.html',
  styleUrls: ['./sidebar-moderators.component.scss']
})
export class SidebarModeratorsComponent implements OnInit {
  @Input() marathon: Marathon;
  @HostBinding('class.collapsed') @Input() collapsed = false;

  constructor() { }

  ngOnInit(): void {
  }

}
