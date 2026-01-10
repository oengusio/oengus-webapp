import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { V2ScheduleLine } from '../../../../../model/schedule-line';
import { getRowParity, toggleTableExpand } from '../../../../../assets/table';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AvailabilityResponse } from '../../../../../model/availability';
import { debounce } from 'lodash';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { ElementTableComponent } from '../../../../elements/element-table/element-table.component';
import { ElementTableRowComponent } from '../../../../elements/element-table-row/element-table-row.component';
import { ElementTableCellComponent } from '../../../../elements/element-table-cell/element-table-cell.component';
import { ScheduleEditRowComponent } from './schedule-edit-row/schedule-edit-row.component';
import { ElementTableDetailComponent } from '../../../../elements/element-table-detail/element-table-detail.component';
import { SetupBlockEditorComponent } from './setup-block-editor/setup-block-editor.component';
import { NormalRunEditorComponent } from './normal-run-editor/normal-run-editor.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-schedule-table',
    templateUrl: './schedule-table.component.html',
    styleUrls: ['./schedule-table.component.scss'],
    imports: [
        CommonModule,
        TranslateModule,
        DragDropModule,
        FontAwesomeModule,
        FormsModule,
        ElementTableComponent,
        ElementTableRowComponent,
        ElementTableCellComponent,
        ScheduleEditRowComponent,
        ElementTableDetailComponent,
        SetupBlockEditorComponent,
        NormalRunEditorComponent,
    ]
})
export class ScheduleTableComponent {
  public getRowParity = getRowParity;
  iconBars = faBars;

  @Input() lines: V2ScheduleLine[] = [];
  @Input() availabilities: AvailabilityResponse;
  @Input() selectedAvailabilities: string[];
  @Input() showAllCustomData: boolean;
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

  deleteRow(linePosition: number): void {
    // Delete collapsed state when line gets deleted
    this.expanded.delete(linePosition);

    this.delete.emit(linePosition);
  }

  public toggleExpand(linePosition: number, openOnly = false): void {
    toggleTableExpand(this.expanded, linePosition, openOnly);
    this.expanded = new Set(this.expanded);
  }

  private estimateChanged() {
    this.computeSchedule.emit();
  }

  scheduleDrop(event: CdkDragDrop<V2ScheduleLine[]>) {
    console.log({ ...event });
    moveItemInArray(this.lines, event.previousIndex, event.currentIndex);
    this.computeSchedule.emit();
  }

  toggleCollapseAll(): void {
    // No impl needed
  }
}
