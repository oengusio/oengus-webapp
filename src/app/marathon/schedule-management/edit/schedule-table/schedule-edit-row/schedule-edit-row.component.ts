import { Component, EventEmitter, inject, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faCalendarTimes, faCalendarWeek, faChevronLeft, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { getRowParity } from '../../../../../../assets/table';
import { LineRunner, V2ScheduleLine } from '../../../../../../model/schedule-line';
import { AvailabilityResponse } from '../../../../../../model/availability';
import { getRunnerDisplayName, getRunnerUsername } from '../../../../../../utils/helpers';
import { ElementTableRowComponent } from '../../../../../elements/element-table-row/element-table-row.component';
import { ElementTableCellComponent } from '../../../../../elements/element-table-cell/element-table-cell.component';
import { ElementTemporalDatetimeComponent } from '../../../../../elements/temporal/element-temporal-datetime/element-temporal-datetime.component';
import { ElementTemporalDurationComponent } from '../../../../../elements/temporal/element-temporal-duration/element-temporal-duration.component';
import { SimpleMdComponent } from '../../../../../components/simple-md/simple-md.component';
import { TemporalServiceService } from '../../../../../../services/termporal/temporal-service.service';

@Component({
    selector: 'app-schedule-edit-row',
    templateUrl: './schedule-edit-row.component.html',
    styleUrls: ['./schedule-edit-row.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        CommonModule,
        TranslateModule,
        FontAwesomeModule,
        ElementTableRowComponent,
        ElementTableCellComponent,
        ElementTemporalDatetimeComponent,
        ElementTemporalDurationComponent,
        SimpleMdComponent,
    ]
})
export class ScheduleEditRowComponent {
  private temporalService = inject(TemporalServiceService);

  @Input() i: number;
  @Input() line: V2ScheduleLine;
  @Input() availabilities: AvailabilityResponse;
  @Input() selectedAvailabilities: string[] = [];
  @Input() expanded = false;

  @Output() toggleExpand = new EventEmitter<number>();
  @Output() moveToToDo = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Output() selectAvailability = new EventEmitter<{ username: string, on: boolean }>();

  getRunnerUsername = getRunnerUsername;
  getRunnerDisplayName = getRunnerDisplayName;
  iconBars = faBars;
  iconTimes = faTimes;
  getRowParity = getRowParity;
  iconEdit = faEdit;
  iconChevronLeft = faChevronLeft;
  iconCalendarWeek = faCalendarWeek;
  iconCalendarTimes = faCalendarTimes;

  matchesAvailabilities() {
    return this.line.runners.every(runner => {
      return this.isAvailable(runner);
    });
  }

  isAvailable(runner: LineRunner) {
    if (!runner.profile) {
      return true;
    }

    const startDateRun = this.line.date;
    const endDateRun = this.line.date.add(Temporal.Duration.from(this.line.estimate));

    const isSameOrBefore = (one: Temporal.ZonedDateTime, two: Temporal.ZonedDateTime) => Temporal.ZonedDateTime.compare(one, two) <= 0;
    const isSameOrAfter = (one: Temporal.ZonedDateTime, two: Temporal.ZonedDateTime) => Temporal.ZonedDateTime.compare(one, two) >= 0;

    return this.availabilities[runner.profile.username] &&
      this.availabilities[runner.profile.username].some(availability => {
        const startDateAvail = this.temporalService.parseDate(availability.from as unknown as string);
        const endDateAvail = this.temporalService.parseDate(availability.to as unknown as string);
        return isSameOrBefore(startDateAvail, startDateRun) && isSameOrAfter(endDateAvail, endDateRun);
      });
  }
}
