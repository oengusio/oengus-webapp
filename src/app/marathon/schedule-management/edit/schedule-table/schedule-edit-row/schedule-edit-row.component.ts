import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faBars, faChevronLeft, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { getRowParity } from '../../../../../../assets/table';
import { LineRunner, V2ScheduleLine } from '../../../../../../model/schedule-line';
import { AvailabilityResponse } from '../../../../../../model/availability';
import moment from 'moment-timezone';

@Component({
  selector: 'app-schedule-edit-row',
  templateUrl: './schedule-edit-row.component.html',
  styleUrls: ['./schedule-edit-row.component.scss']
})
export class ScheduleEditRowComponent {
  @Input() i: number;
  @Input() line: V2ScheduleLine;
  @Input() availabilities: AvailabilityResponse;
  @Input() expanded = false;

  @Output() toggleExpand = new EventEmitter<number>();
  @Output() moveToToDo = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  public timezone = moment.tz.guess();

  iconBars = faBars;
  iconTimes = faTimes;
  getRowParity = getRowParity;
  iconEdit = faEdit;
  iconChevronLeft = faChevronLeft;

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
