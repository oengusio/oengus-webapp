import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule } from '@oengusio/ngx-translate-router';
import { ScheduleInfo } from '../../../../model/schedule';
import { ScheduleService } from '../../../../services/schedule.service';
import { MarathonService } from '../../../../services/marathon.service';
import { UserSupporterStatus } from '../../../../model/user';
import { UserService } from '../../../../services/user.service';
import { NotificationService } from '../../../../services/notification.service';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
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
  private toastr = inject(NotificationService);


  schedules: ScheduleInfo[] = [];
  // @ts-expect-error meh.
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
        this.toastr.toastRaw('Schedule deleted', 5000);

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
