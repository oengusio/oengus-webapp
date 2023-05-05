import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-overview',
  templateUrl: './sidebar-overview.component.html',
  styleUrls: ['./sidebar-overview.component.scss']
})
export class SidebarOverviewComponent implements OnInit {
  @Input() collapsed = false;

  constructor() { }

  ngOnInit(): void {
  }

}
