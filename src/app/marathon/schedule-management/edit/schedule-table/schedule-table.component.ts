import { Component, EventEmitter, Input, Output } from '@angular/core';
import { V2ScheduleLine } from '../../../../../model/schedule-line';
import { getRowParity } from '../../../../../assets/table';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AvailabilityResponse } from '../../../../../model/availability';
import { debounce } from 'lodash';

@Component({
  selector: 'app-schedule-table',
  templateUrl: './schedule-table.component.html',
  styleUrls: ['./schedule-table.component.scss'],
})
export class ScheduleTableComponent {
  public getRowParity = getRowParity;

  @Input() lines: V2ScheduleLine[] = [];
  @Input() availabilities: AvailabilityResponse;
  @Input() selectedAvailabilities: Array<string>;
  @Output() moveToToDo = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Output() computeSchedule = new EventEmitter<void>();
  @Output() loadAvailabilities = new EventEmitter<number>();
  @Output() selectAvailability = new EventEmitter<{ username: string, on: boolean }>();

  expanded = new Set<number>();

  estimateChangedDebounce = debounce(this.estimateChanged, 500);

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

  toggleExpand(linePosition: number): void {
    if (this.expanded.has(linePosition)) {
      this.expanded.delete(linePosition);
    } else {
      this.expanded.add(linePosition);
    }
  }

  private estimateChanged() {
    this.computeSchedule.emit();
  }

  scheduleDrop(event: CdkDragDrop<V2ScheduleLine[]>) {
    console.log(event);
    // TODO: use moveItemInArray from @angular/cdk/drag-drop to move the item around when the UI allows the drag and drop to work.
    this.computeSchedule.emit();
  }
}
