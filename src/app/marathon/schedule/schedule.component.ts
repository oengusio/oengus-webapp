import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Schedule } from '../../../model/schedule';
import moment from 'moment-timezone';
import { MarathonService } from '../../../services/marathon.service';
import { ScheduleService } from '../../../services/schedule.service';
import { ScheduleLine } from '../../../model/schedule-line';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnDestroy {

  public schedule: Schedule;
  public moment = moment;

  public timezone = moment.tz.guess();

  public currentIndex: number;
  private scheduleRefresher: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public marathonService: MarathonService,
              private scheduleService: ScheduleService) {
    if (!this.marathonService.marathon.scheduleDone) {
      this.router.navigate(['../'], {relativeTo: this.route});
    }
    if (this.route.snapshot.data.schedule) {
      this.schedule = this.route.snapshot.data.schedule;
    } else {
      this.schedule = new Schedule();
    }
    this.setCurrentRunId();
    const now = new Date();
    const initialDelay = 60 * 1000 - (now.getSeconds() * 1000 + now.getMilliseconds());
    this.scheduleRefresher = timer(initialDelay, 60000).subscribe(() => this.setCurrentRunId());
  }

  setCurrentRunId() {
    this.schedule.lines.forEach((line, index) => {
      if (this.isCurrentRun(line)) {
        this.currentIndex = index;
      }
    });
  }

  get currentRun() {
    return this.schedule.lines[this.currentIndex];
  }

  get nextRun() {
    if (this.currentIndex + 1 >= this.schedule.lines.length) {
      return null;
    }

    return this.schedule.lines[this.currentIndex + 1];
  }

  export(format: string) {
    this.scheduleService.exportAllForMarathon(this.marathonService.marathon.id, format);
  }

  isCurrentRun(line: ScheduleLine) {
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
    return 'Schedule';
  }
}
