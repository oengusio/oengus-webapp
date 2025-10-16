import { Component, HostBinding, inject, Input, OnInit } from '@angular/core';
import { Marathon } from '../../../model/marathon';
import { UserService } from '../../../services/user.service';
import { ScheduleService } from '../../../services/schedule.service';
import { ScheduleInfo } from '../../../model/schedule';

@Component({
    selector: 'app-marathon-sidebar-overview',
    templateUrl: './sidebar-overview.component.html',
    styleUrls: ['./sidebar-overview.component.scss'],
    standalone: false
})
export class SidebarOverviewComponent implements OnInit {
  private userService = inject(UserService);
  private scheduleService = inject(ScheduleService);

  @Input() marathon: Marathon;
  @Input() isBigHome = false;
  @HostBinding('class.collapsed') @Input() collapsed = false;

  schedules: ScheduleInfo[] = [];

  ngOnInit(): void {
    if (this.marathon.scheduleDone) {
      this.scheduleService.getAllOverview(this.marathon.id).subscribe(schedules => {
        this.schedules = schedules.filter(it => it.published);
      });
    }
  }

  get iconHome() {
    return this.isBigHome ? 'fa-lg fa-home' : 'fa-home';
  }

  get marathonId() {
    return this.marathon.id;
  }

  get loggedIn(): boolean {
    return !!this.userService.user;
  }
}
