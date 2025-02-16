import { Component, Input } from '@angular/core';
import { Marathon } from '../../../model/marathon';

@Component({
    selector: 'app-calendar-view-row',
    templateUrl: './calendar-view-row.component.html',
    styleUrls: ['./calendar-view-row.component.scss'],
    standalone: false
})
export class CalendarViewRowComponent {
  @Input() marathon: Marathon;
  @Input() datetime: string;

  getHoursFraction(date: Date): number {
    return date.getHours() + date.getMinutes() / 60;
  }

  get todayStart(): Date {
    return new Date(this.datetime);
  }

  get todayEnd(): Date {
    const todayEnd = new Date(this.todayStart);
    todayEnd.setDate(this.todayStart.getDate() + 1);
    return todayEnd;
  }

  get marathonStart(): Date {
    return new Date(this.marathon.startDate);
  }

  get marathonEnd(): Date {
    return new Date(this.marathon.endDate);
  }

  get start(): number {
    return this.todayStart < this.marathonStart ? this.getHoursFraction(this.marathonStart) : 0;
  }

  get end(): number {
    return this.todayEnd > this.marathonEnd ? this.getHoursFraction(this.marathonEnd) : 24;
  }

  get rangeColor(): { 'is-primary': boolean, 'is-info': boolean } {
    const now = Date.now();
    const isNow = this.marathonStart.getTime() <= now && now <= this.marathonEnd.getTime();
    return {
      'is-primary': isNow,
      'is-info': !isNow,
    };
  }

  get durationKey(): string {
    switch (this.durationText) {
      case 'calendar.endsAt':
        return 'end-time';
      case 'calendar.startsAt':
        return 'start-time';
      case 'calendar.between':
        return 'time-range';
      case 'calendar.allDay':
      default:
        return '';
    }
  }

  get durationText(): string {
    let durationText: string;
    if (this.start === 0) {
      if (this.end === 24) {
        durationText = 'calendar.allDay';
      } else {
        durationText = 'calendar.endsAt';
      }
    } else if (this.end === 24) {
      durationText = 'calendar.startsAt';
    } else {
      durationText = 'calendar.between';
    }
    return durationText;
  }
}
