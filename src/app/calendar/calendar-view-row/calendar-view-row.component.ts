import { Component, inject, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule } from '@oengusio/ngx-translate-router';
import { Marathon } from '../../../model/marathon';
import { ElementModule } from '../../elements/elements.module';
import { ComponentsModule } from '../../components/components.module';
import { TemporalServiceService } from '../../../services/termporal/temporal-service.service';

@Component({
    selector: 'app-calendar-view-row',
    templateUrl: './calendar-view-row.component.html',
    styleUrls: ['./calendar-view-row.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        CommonModule,
        RouterModule,
        TranslateModule,
        LocalizeRouterModule,
        ElementModule,
        ComponentsModule,
    ]
})
export class CalendarViewRowComponent {
  private temporalService = inject(TemporalServiceService);

  @Input() marathon: Marathon;
  @Input() datetime: string;

  getHoursFraction(date: Temporal.ZonedDateTime): number {
    return date.hour + date.minute / 60;
  }

  get todayStart(): Temporal.ZonedDateTime {
    return Temporal.Instant.from(this.datetime).toZonedDateTimeISO(this.temporalService.timeZone.timeZone);
  }

  get todayEnd(): Temporal.ZonedDateTime {
    const startDate = this.todayStart;

    return startDate.startOfDay().add(Temporal.Duration.from({ hours: startDate.hoursInDay }));
  }

  get marathonStart(): Temporal.ZonedDateTime {
    return this.marathon.startDate;
  }

  get marathonEnd(): Temporal.ZonedDateTime {
    return this.marathon.endDate;
  }

  get start(): number {
    return Temporal.ZonedDateTime.compare(this.todayStart, this.marathonStart) === -1 ? this.getHoursFraction(this.marathonStart) : 0;
  }

  get end(): number {
    return Temporal.ZonedDateTime.compare(this.todayEnd, this.marathonEnd) === 1 ? this.getHoursFraction(this.marathonEnd) : 24;
  }

  get rangeColor(): { 'is-primary': boolean, 'is-info': boolean } {
    const now = this.temporalService.now;
    const isNow = Temporal.ZonedDateTime.compare(this.marathonStart, now) <= 0
      && Temporal.ZonedDateTime.compare(now, this.marathonEnd) <= 0;
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
