import { Component, EventEmitter, inject, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { LineRunner, V2ScheduleLine } from '../../../../../model/schedule-line';
import { AvailabilityResponse } from '../../../../../model/availability';
import { getRowParity, toggleTableExpand } from '../../../../../assets/table';
import { faBars, faCalendarTimes, faCalendarWeek, faChevronLeft, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { debounce } from 'lodash';
import { getRunnerDisplayName, getRunnerUsername } from '../../../../../utils/helpers';
import { ElementTableCellComponent } from '../../../../elements/element-table-cell/element-table-cell.component';
import { ElementTemporalDatetimeComponent } from '../../../../elements/temporal/element-temporal-datetime/element-temporal-datetime.component';
import { ElementTemporalDurationComponent } from '../../../../elements/temporal/element-temporal-duration/element-temporal-duration.component';
import { SimpleMdComponent } from '../../../../components/simple-md/simple-md.component';
import { ElementTableDetailComponent } from '../../../../elements/element-table-detail/element-table-detail.component';
import { SetupBlockEditorComponent } from '../schedule-table/setup-block-editor/setup-block-editor.component';
import { NormalRunEditorComponent } from '../schedule-table/normal-run-editor/normal-run-editor.component';
import { TemporalServiceService } from '../../../../../services/termporal/temporal-service.service';
import { IdType } from 'vis-timeline/esnext';

/**
 * @-deprecated please use the new component when we get it working.
 */
@Component({
    selector: 'app-schedule-table-old-element',
    templateUrl: './schedule-table-old-element.component.html',
    styleUrls: ['./schedule-table-old-element.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        FontAwesomeModule,
        DragDropModule,
        ElementTableCellComponent,
        ElementTemporalDatetimeComponent,
        ElementTemporalDurationComponent,
        SimpleMdComponent,
        ElementTableDetailComponent,
        SetupBlockEditorComponent,
        NormalRunEditorComponent,
    ]
})
export class ScheduleTableOldElementComponent {
  private temporalService = inject(TemporalServiceService);

  public getRowParity = getRowParity;
  getRunnerUsername = getRunnerUsername;
  getRunnerDisplayName = getRunnerDisplayName;

  @Input() lines: V2ScheduleLine[] = [];
  // @ts-expect-error meh.
  @Input() availabilities: AvailabilityResponse;
  @Input() selectedAvailabilities: IdType[] = [];
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

  public toggleExpand(linePosition: number, openOnly = false): void {
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

    const startDateRun = line.date;
    const endDateRun = line.date.add(Temporal.Duration.from(line.estimate));

    const isSameOrBefore = (one: Temporal.ZonedDateTime, two: Temporal.ZonedDateTime) => Temporal.ZonedDateTime.compare(one, two) <= 0;
    const isSameOrAfter = (one: Temporal.ZonedDateTime, two: Temporal.ZonedDateTime) => Temporal.ZonedDateTime.compare(one, two) >= 0;

    return this.availabilities[runner.profile.username] &&
      this.availabilities[runner.profile.username].some(availability => {
        const startDateAvail = this.temporalService.parseDate(availability.from as unknown as string);
        const endDateAvail = this.temporalService.parseDate(availability.to as unknown as string);
        return isSameOrBefore(startDateAvail, startDateRun) && isSameOrAfter(endDateAvail, endDateRun);
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
    const currentRun = this.lines[index].date;
    // We have an implicit index test for the index=0 case, so this is always safe
    const previousRun = this.lines[index - 1].date;

    return currentRun.day !== previousRun.day ||
      currentRun.month !== previousRun.month ||
      currentRun.year !== previousRun.year;
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

  onCustomDataBlur(lineIndex: number, event: FocusEvent) {
    const textArea = event.target as HTMLTextAreaElement;

    this.lines[lineIndex].customData = textArea.value;
  }
}
