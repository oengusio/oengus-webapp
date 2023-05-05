import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.scss']
})
export class SidebarAdminComponent implements OnInit {
  @Input() collapsed = false;

  constructor() { }

  ngOnInit(): void {
  }

}
