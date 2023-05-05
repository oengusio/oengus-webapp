import { Component, Input, OnInit } from '@angular/core';
import { TemporalServiceService } from '../../../../services/termporal/temporal-service.service';
import { ScheduleLine } from '../../../../model/schedule-line';

@Component({
  selector: 'app-marathon-schedule-current',
  templateUrl: './marathon-schedule-current.component.html',
  styleUrls: ['./marathon-schedule-current.component.scss']
})
export class MarathonScheduleCurrentComponent implements OnInit {
  @Input() isNext = false;
  @Input() ticker: ScheduleLine;

  constructor(private temporal: TemporalServiceService) { }

  ngOnInit(): void {
  }

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
