import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Marathon } from '../../../model/marathon';
import { faBook, faCalendar, faCircle, faHome, faHomeLg, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../../services/user.service';
import { ScheduleService } from '../../../services/schedule.service';
import { ScheduleInfo } from '../../../model/schedule';

@Component({
  selector: 'app-marathon-sidebar-overview',
  templateUrl: './sidebar-overview.component.html',
  styleUrls: ['./sidebar-overview.component.scss']
})
export class SidebarOverviewComponent implements OnInit {
  @Input() marathon: Marathon;
  @Input() isBigHome = false;
  @HostBinding('class.collapsed') @Input() collapsed = false;

  iconCircle = faCircle;
  iconPaperPlane = faPaperPlane;
  iconCalendar = faCalendar;
  iconBook = faBook;

  schedules: Array<ScheduleInfo> = [];

  constructor(
    private userService: UserService,
    private scheduleService: ScheduleService,
  ) {
  }

  ngOnInit(): void {
    if (this.marathon.scheduleDone) {
      this.scheduleService.getAllOverview(this.marathon.id).subscribe(schedules => {
        this.schedules = schedules.filter(it => it.published);
      });
    }
  }

  get iconHome() {
    return this.isBigHome ? faHomeLg : faHome;
  }

  get marathonId() {
    return this.marathon.id;
  }

  get loggedIn(): boolean {
    return !!this.userService.user;
  }
}
