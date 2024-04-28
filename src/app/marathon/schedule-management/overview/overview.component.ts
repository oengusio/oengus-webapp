import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScheduleInfo } from '../../../../model/schedule';
import { ScheduleService } from '../../../../services/schedule.service';
import { NwbAlertConfig, NwbAlertService } from '@wizishop/ng-wizi-bulma';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  schedules: ScheduleInfo[] = [];

  constructor(
    private route: ActivatedRoute,
    private scheduleService: ScheduleService,
    private toastr: NwbAlertService,
  ) {
    this.schedules = this.route.snapshot.data.schedules;
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
}
