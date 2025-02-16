import { Component, HostBinding, Input } from '@angular/core';
import { Marathon } from '../../../../model/marathon';
import { faCalendarCheck, faCheckSquare, faCogs, faDotCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-sidebar-admin',
    templateUrl: './sidebar-admin.component.html',
    styleUrls: ['./sidebar-admin.component.scss'],
    standalone: false
})
export class SidebarAdminComponent {
  @Input() marathon: Marathon;
  @HostBinding('class.collapsed') @Input() collapsed = false;

  iconSettings = faCogs;
  iconSelectRuns = faCheckSquare;
  iconManageSchedule = faCalendarCheck;
  iconManageIncentive = faDotCircle;

  get marathonId() {
    return this.marathon.id;
  }

}
