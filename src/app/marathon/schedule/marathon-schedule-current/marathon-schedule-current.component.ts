import { Component, Input } from '@angular/core';
import { TemporalServiceService } from '../../../../services/termporal/temporal-service.service';
import { V2ScheduleLine } from '../../../../model/schedule-line';

@Component({
    selector: 'app-marathon-schedule-current',
    templateUrl: './marathon-schedule-current.component.html',
    styleUrls: ['./marathon-schedule-current.component.scss'],
    standalone: false
})
export class MarathonScheduleCurrentComponent {
  @Input() isNext = false;
  @Input() ticker: V2ScheduleLine;

  constructor(private temporal: TemporalServiceService) { }

  get messageClass(): string {
    return this.isNext ? '' : 'is-primary';
  }

  get linkedRun(): string {
    return this.isNext ? 'next' : 'current';
  }

  get messageHeaderTitle(): string {
    return this.isNext ? 'marathon.schedule.nextRun' : 'marathon.schedule.currentRun';
  }

  get messageHeaderArgs(): { duration?: string } {
    return this.isNext ? { duration: this.temporal.distance.format(this.ticker?.date ?? new Date()) } : { };
  }

}
