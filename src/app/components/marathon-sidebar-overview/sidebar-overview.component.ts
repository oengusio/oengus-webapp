import { Component, HostBinding, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule } from '@oengusio/ngx-translate-router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Marathon } from '../../../model/marathon';
import { faBook, faCalendar, faCircle, faHome, faHomeLg, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faCalendar as faCalendarRegular } from '@fortawesome/free-regular-svg-icons';
import { UserService } from '../../../services/user.service';
import { ScheduleService } from '../../../services/schedule.service';
import { ScheduleInfo } from '../../../model/schedule';
import { ElementLoginLinkSelectorComponent } from '../../elements/element-login-link-selector/element-login-link-selector.component';

@Component({
    selector: 'app-marathon-sidebar-overview',
    templateUrl: './sidebar-overview.component.html',
    styleUrls: ['./sidebar-overview.component.scss'],
    imports: [
        CommonModule,
        RouterModule,
        TranslateModule,
        LocalizeRouterModule,
        FontAwesomeModule,
        ElementLoginLinkSelectorComponent,
    ]
})
export class SidebarOverviewComponent implements OnInit {
  private userService = inject(UserService);
  private scheduleService = inject(ScheduleService);

  @Input() marathon: Marathon;
  @Input() isBigHome = false;
  @HostBinding('class.collapsed') @Input() collapsed = false;

  iconCircle = faCircle;
  iconPaperPlane = faPaperPlane;
  iconCalendar = faCalendar;
  iconCalendarRegular = faCalendarRegular;
  iconBook = faBook;

  schedules: ScheduleInfo[] = [];

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
