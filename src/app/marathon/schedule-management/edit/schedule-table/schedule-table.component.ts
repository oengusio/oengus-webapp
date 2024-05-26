import { Component, EventEmitter, Input, Output } from '@angular/core';
import { V2ScheduleLine } from '../../../../../model/schedule-line';
import { getRowParity } from '../../../../../assets/table';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-schedule-table',
  templateUrl: './schedule-table.component.html',
  styleUrls: ['./schedule-table.component.scss']
})
export class ScheduleTableComponent {
  getRowParity = getRowParity;

  @Input() lines: V2ScheduleLine[] = [];
  @Output() moveToToDo = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Output() computeSchedule = new EventEmitter<void>();

  expanded = new Set<number>();

  toggleExpand(lineId: number): void {
    if (this.expanded.has(lineId)) {
      this.expanded.delete(lineId);
    } else {
      this.expanded.add(lineId);
    }
  }

  // TODO: events for when estimate or setup changes.

  scheduleDrop(event: CdkDragDrop<V2ScheduleLine[]>) {
    console.log(event);
    this.computeSchedule.emit();
  }
}
