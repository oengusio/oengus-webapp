import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { V2ScheduleLine } from '../../../../../model/schedule-line';
import { faBars, faChevronLeft, faEdit, faPencil, faTimes } from '@fortawesome/free-solid-svg-icons';
import { getRowParity } from '../../../../../assets/table';

@Component({
  selector: 'app-schedule-table',
  templateUrl: './schedule-table.component.html',
  styleUrls: ['./schedule-table.component.scss']
})
export class ScheduleTableComponent implements OnInit {
  public getRowParity = getRowParity;
  public iconBars = faBars;
  public iconEdit = faEdit;
  public iconTimes = faTimes;
  public iconPencil = faPencil;
  iconChevronLeft = faChevronLeft;

  @Input() lines: V2ScheduleLine[] = [];
  @Output() moveToToDo = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  expanded = new Set<number>();

  constructor() { }

  ngOnInit(): void {
  }

  toggleExpand(lineId: number): void {
    if (this.expanded.has(lineId)) {
      this.expanded.delete(lineId);
    } else {
      this.expanded.add(lineId);
    }
  }

}
