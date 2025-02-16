import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { V2Schedule } from '../../../model/schedule';
import moment from 'moment-timezone';
import { MarathonService } from '../../../services/marathon.service';
import { V2ScheduleLine } from '../../../model/schedule-line';
import { Subscription, timer } from 'rxjs';

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.scss'],
    standalone: false
})
export class ScheduleComponent implements OnDestroy {

  public schedule: V2Schedule;
  public moment = moment;

  public timezone = moment.tz.guess();

  public currentIndex: number | undefined;
  private scheduleRefresher: Subscription;

  runHash = '';

  constructor(private route: ActivatedRoute,
              private router: Router,
              public marathonService: MarathonService) {
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

  get title(): string {
    // TODO: this title system needs to be reworked to allow for more dynamic titles
    return 'Schedule';
  }
}
