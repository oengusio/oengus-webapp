import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-moderators',
  templateUrl: './sidebar-moderators.component.html',
  styleUrls: ['./sidebar-moderators.component.scss']
})
export class SidebarModeratorsComponent implements OnInit {
  @Input() collapsed = false;

  constructor() { }

  ngOnInit(): void {
  }

}
