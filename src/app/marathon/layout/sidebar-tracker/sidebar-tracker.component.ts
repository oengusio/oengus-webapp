import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-tracker',
  templateUrl: './sidebar-tracker.component.html',
  styleUrls: ['./sidebar-tracker.component.scss']
})
export class SidebarTrackerComponent implements OnInit {
  @Input() collapsed = false;

  constructor() { }

  ngOnInit(): void {
  }

}
