import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Marathon } from '../../../../model/marathon';
import { faCalendarCheck, faCheckSquare, faCogs, faDotCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.scss']
})
export class SidebarAdminComponent implements OnInit {
  @Input() marathon: Marathon;
  @HostBinding('class.collapsed') @Input() collapsed = false;

  iconSettings = faCogs;
  iconSelectRuns = faCheckSquare;
  iconManageSchedule = faCalendarCheck;
  iconManageIncentive = faDotCircle;

  constructor() { }

  ngOnInit(): void {
  }

  get marathonId() {
    return this.marathon.id;
  }

}
