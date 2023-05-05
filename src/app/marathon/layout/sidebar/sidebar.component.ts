import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() collapsed = false;

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
