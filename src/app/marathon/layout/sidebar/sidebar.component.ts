import { Component, Input, OnInit } from '@angular/core';
import { Marathon } from '../../../../model/marathon';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() isAdmin: boolean;
  @Input() collapsed = false;
  @Input() marathon: Marathon;

  constructor() { }

  ngOnInit(): void {
  }

  get isActiveClass() {
    return {
      'is-active': !this.collapsed,
    };
  }

  toggleSidebar(): void {
    //
  }
}
