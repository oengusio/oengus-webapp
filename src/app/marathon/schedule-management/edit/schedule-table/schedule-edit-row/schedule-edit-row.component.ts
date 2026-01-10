import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faCalendarTimes, faCalendarWeek, faChevronLeft, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { getRowParity } from '../../../../../../assets/table';
import { LineRunner, V2ScheduleLine } from '../../../../../../model/schedule-line';
import { AvailabilityResponse } from '../../../../../../model/availability';
import moment from 'moment-timezone';
import { getRunnerDisplayName, getRunnerUsername } from '../../../../../../utils/helpers';
import { ElementTableRowComponent } from '../../../../../elements/element-table-row/element-table-row.component';
import { ElementTableCellComponent } from '../../../../../elements/element-table-cell/element-table-cell.component';
import { ElementTemporalDatetimeComponent } from '../../../../../elements/temporal/element-temporal-datetime/element-temporal-datetime.component';
import { ElementTemporalDurationComponent } from '../../../../../elements/temporal/element-temporal-duration/element-temporal-duration.component';
import { SimpleMdComponent } from '../../../../../components/simple-md/simple-md.component';

@Component({
    selector: 'app-schedule-edit-row',
    templateUrl: './schedule-edit-row.component.html',
    styleUrls: ['./schedule-edit-row.component.scss'],
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
  @Input() i: number;
  @Input() line: V2ScheduleLine;
  @Input() availabilities: AvailabilityResponse;
  @Input() selectedAvailabilities: string[] = [];
  @Input() expanded = false;

  @Output() toggleExpand = new EventEmitter<number>();
  @Output() moveToToDo = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Output() selectAvailability = new EventEmitter<{ username: string, on: boolean }>();

  public timezone = moment.tz.guess();

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

    // TODO: do we still need moment?
    const startDateRun = moment.tz(this.line.date, this.timezone);
    const endDateRun = moment.tz(this.line.date, this.timezone).add(moment.duration(this.line.estimate));

    return this.availabilities[runner.profile.username] &&
      this.availabilities[runner.profile.username].some(availability => {
        const startDateAvail = moment.tz(availability.from, this.timezone);
        const endDateAvail = moment.tz(availability.to, this.timezone);
        return startDateAvail.isSameOrBefore(startDateRun) && endDateAvail.isSameOrAfter(endDateRun);
      });
  }
}
