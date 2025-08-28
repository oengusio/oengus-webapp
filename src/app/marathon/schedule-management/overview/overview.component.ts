import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    standalone: false
})
export class OverviewComponent implements OnInit {

  schedules: ScheduleInfo[] = [];
  private supporterStatus: UserSupporterStatus;

  constructor(
    private route: ActivatedRoute,
    private scheduleService: ScheduleService,
    private marathonService: MarathonService,
    private userService: UserService,
    private toastr: NwbAlertService,
  ) {
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
