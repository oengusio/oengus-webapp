import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LineRunner, V2ScheduleLine } from '../../../../../model/schedule-line';
import { AvailabilityResponse } from '../../../../../model/availability';
import { getRowParity, toggleTableExpand } from '../../../../../assets/table';
import moment from 'moment-timezone';
import { faBars, faCalendarTimes, faCalendarWeek, faChevronLeft, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { debounce } from 'lodash';
import { getRunnerDisplayName, getRunnerUsername } from '../../../../../utils/helpers';

/**
 * @-deprecated please use the new component when we get it working.
 */
@Component({
    selector: 'app-schedule-table-old-element',
    templateUrl: './schedule-table-old-element.component.html',
    styleUrls: ['./schedule-table-old-element.component.scss'],
    standalone: false
})
export class ScheduleTableOldElementComponent {
  public getRowParity = getRowParity;
  getRunnerUsername = getRunnerUsername;
  getRunnerDisplayName = getRunnerDisplayName;
  public timezone = moment.tz.guess();

  @Input() lines: V2ScheduleLine[] = [];
  @Input() availabilities: AvailabilityResponse;
  @Input() selectedAvailabilities: Array<string>;
  showAllCustomData = false;
  @Output() moveToToDo = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Output() computeSchedule = new EventEmitter<void>();
  @Output() loadAvailabilities = new EventEmitter<number>();
  @Output() selectAvailability = new EventEmitter<{ username: string, on: boolean }>();

  expanded = new Set<number>();
  estimateChangedDebounce = debounce(this.estimateChanged, 500);

  iconBars = faBars;
  iconTimes = faTimes;
  iconEdit = faEdit;
  iconChevronLeft = faChevronLeft;
  iconCalendarWeek = faCalendarWeek;
  iconCalendarTimes = faCalendarTimes;

  public toggleExpand(linePosition: number, openOnly: boolean = false): void {
    toggleTableExpand(this.expanded, linePosition, openOnly);
    this.expanded = new Set(this.expanded);
  }

  matchesAvailabilities(line: V2ScheduleLine): boolean {
    return line.runners.every(runner => {
      return this.isAvailable(line, runner);
    });
  }

  isAvailable(line: V2ScheduleLine, runner: LineRunner) {
    if (!runner.profile) {
      return true;
    }

    // TODO: do we still need moment?
    const startDateRun = moment.tz(line.date, this.timezone);
    const endDateRun = moment.tz(line.date, this.timezone).add(moment.duration(line.estimate));

    return this.availabilities[runner.profile.username] &&
      this.availabilities[runner.profile.username].some(availability => {
        const startDateAvail = moment.tz(availability.from, this.timezone);
        const endDateAvail = moment.tz(availability.to, this.timezone);
        return startDateAvail.isSameOrBefore(startDateRun) && endDateAvail.isSameOrAfter(endDateRun);
      });
  }

  shouldShowDay(index: number): boolean {
    // Always show the day header at the top
    if (index === 0) {
      return true;
    }

    if (!this.lines[index]) {
      return false;
    }

    // Otherwise, only show when the day transitioned
    const currentRun = new Date(this.lines[index].date);
    // We have an implicit index test for the index=0 case, so this is always safe
    const previousRun = new Date(this.lines[index - 1].date);

    return currentRun.getDate() !== previousRun.getDate() ||
      currentRun.getMonth() !== previousRun.getMonth() ||
      currentRun.getFullYear() !== previousRun.getFullYear();
  }

  scheduleDrop(event: CdkDragDrop<V2ScheduleLine[]>) {
    console.log({ ...event });
    moveItemInArray(this.lines, event.previousIndex, event.currentIndex);
    this.computeSchedule.emit();
  }

  private estimateChanged() {
    this.computeSchedule.emit();
  }

  toggleCollapseAll(open: boolean): void {
    this.showAllCustomData = open;
  }
}
