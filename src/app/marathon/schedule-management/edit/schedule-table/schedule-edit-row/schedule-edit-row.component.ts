import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faBars, faChevronLeft, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { getRowParity } from '../../../../../../assets/table';
import { V2ScheduleLine } from '../../../../../../model/schedule-line';

@Component({
  selector: 'app-schedule-edit-row',
  templateUrl: './schedule-edit-row.component.html',
  styleUrls: ['./schedule-edit-row.component.scss']
})
export class ScheduleEditRowComponent {
  @Input() i: number;
  @Input() line: V2ScheduleLine;
  @Input() expanded = false;

  @Output() toggleExpand = new EventEmitter<number>();
  @Output() moveToToDo = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  iconBars = faBars;
  iconTimes = faTimes;
  getRowParity = getRowParity;
  iconEdit = faEdit;
  iconChevronLeft = faChevronLeft;
}
