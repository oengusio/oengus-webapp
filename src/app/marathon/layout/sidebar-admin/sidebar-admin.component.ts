import { Component, HostBinding, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule } from '@oengusio/ngx-translate-router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Marathon } from '../../../../model/marathon';
import { faCalendarCheck, faCheckSquare, faCogs, faDotCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-sidebar-admin',
    templateUrl: './sidebar-admin.component.html',
    styleUrls: ['./sidebar-admin.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        CommonModule,
        RouterModule,
        TranslateModule,
        LocalizeRouterModule,
        FontAwesomeModule,
    ]
})
export class SidebarAdminComponent {
  // @ts-expect-error meh.
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
