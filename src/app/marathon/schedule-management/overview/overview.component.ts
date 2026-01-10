import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule } from '@oengusio/ngx-translate-router';
import { ScheduleInfo } from '../../../../model/schedule';
import { ScheduleService } from '../../../../services/schedule.service';
import { NwbAlertConfig, NwbAlertService } from '@oengus/ng-wizi-bulma';
import { MarathonService } from '../../../../services/marathon.service';
import { UserSupporterStatus } from '../../../../model/user';
import { UserService } from '../../../../services/user.service';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
    imports: [
        CommonModule,
        RouterModule,
        TranslateModule,
        LocalizeRouterModule,
    ]
})
export class OverviewComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private scheduleService = inject(ScheduleService);
  private marathonService = inject(MarathonService);
  private userService = inject(UserService);
  private toastr = inject(NwbAlertService);


  schedules: ScheduleInfo[] = [];
  private supporterStatus: UserSupporterStatus;

  constructor() {
    this.schedules = this.route.snapshot.data.schedules;

    const creatorId = this.marathonService.marathon.creator.id;

    this.userService.getSupporterStatus(creatorId).subscribe(status => {
      this.supporterStatus = status;
    });
  }

  ngOnInit(): void {
    console.log(this.schedules);
  }

  deleteSchedule(schedule: ScheduleInfo): void {
    const sure = confirm(`Are you sure that you want to delete "${schedule.name}"?`);

    if (sure) {
      this.scheduleService.deleteById(schedule.marathonId, schedule.id).subscribe(() => {
        const alertConfig: NwbAlertConfig = {
          message: 'Schedule deleted',
          duration: 5000,
          position: 'is-right',
          color: 'is-success'
        };
        this.toastr.open(alertConfig);

        const idx = this.schedules.indexOf(schedule);

        if (idx > -1) {
          this.schedules.splice(idx, 1);
        }
      });
    }
  }

  get maxScheduleCount(): number {
    return this.isSponsor ? 4 : 1;
  }

  get isSponsor(): boolean {
    return this.supporterStatus?.anySupporter ?? false;
  }
}
