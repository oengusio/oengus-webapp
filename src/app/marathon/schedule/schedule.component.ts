import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { V2Schedule } from '../../../model/schedule';
import moment from 'moment-timezone';
import { MarathonService } from '../../../services/marathon.service';
import { V2ScheduleLine } from '../../../model/schedule-line';
import { Subscription, timer } from 'rxjs';
import { MarathonScheduleShareComponent } from './marathon-schedule-share/marathon-schedule-share.component';
import { MarathonScheduleExportComponent } from './marathon-schedule-export/marathon-schedule-export.component';
import { MarathonScheduleCurrentComponent } from './marathon-schedule-current/marathon-schedule-current.component';
import { MarathonScheduleListComponent } from './marathon-schedule-list/marathon-schedule-list.component';

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.scss'],
    imports: [
        CommonModule,
        TranslateModule,
        MarathonScheduleShareComponent,
        MarathonScheduleExportComponent,
        MarathonScheduleCurrentComponent,
        MarathonScheduleListComponent,
    ]
})
export class ScheduleComponent implements OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  marathonService = inject(MarathonService);


  public schedule: V2Schedule;
  public moment = moment;

  public timezone = moment.tz.guess();

  public currentIndex: number | undefined;
  private scheduleRefresher: Subscription;

  runHash = '';

  // TODO: this title system needs to be reworked to allow for more dynamic titles
  readonly title = 'Schedule';

  constructor() {
    const route = this.route;

    route.fragment.subscribe((fragment) => {
      this.runHash = `#${fragment}`;
    });

    route.data.subscribe((routeData) => {
      if (!this.marathonService.marathon.scheduleDone) {
        this.router.navigate(['../'], {relativeTo: this.route});
      }
      if (routeData.schedule) {
        this.schedule = routeData.schedule;

        this.setCurrentRunId();
        const now = new Date();
        const initialDelay = 60 * 1000 - (now.getSeconds() * 1000 + now.getMilliseconds());
        this.scheduleRefresher = timer(initialDelay, 60000).subscribe(() => this.setCurrentRunId());
      } else {
        this.router.navigate(['/404'], { skipLocationChange: true});
      }
    });
  }

  setCurrentRunId() {
    this.schedule.lines.forEach((line, index) => {
      if (this.isCurrentRun(line)) {
        this.currentIndex = index;
      }
    });
  }

  get currentRun() {
    if (!this.schedule.lines.length) {
      return null;
    }

    return this.schedule.lines[this.currentIndex];
  }

  get nextRun() {
    if (this.currentIndex === undefined) {
      return this.schedule.lines[0];
    }

    if (this.currentIndex + 1 >= this.schedule.lines.length) {
      return null;
    }

    return this.schedule.lines[this.currentIndex + 1];
  }

  isCurrentRun(line: V2ScheduleLine) {
    const now = moment.now();
    return moment.tz(line.date, this.timezone).isBefore(now) &&
      moment.tz(line.date, this.timezone)
        .add(moment.duration(line.estimate))
        .add(moment.duration(line.setupTime)).isAfter(now);
  }

  ngOnDestroy(): void {
    this.scheduleRefresher.unsubscribe();
  }
}
