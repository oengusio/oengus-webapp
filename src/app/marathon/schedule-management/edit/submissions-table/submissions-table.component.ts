import { Component, EventEmitter, Input, Output } from '@angular/core';
import { V2ScheduleLine } from '../../../../../model/schedule-line';
import { getRowParity } from '../../../../../assets/table';

@Component({
  selector: 'app-submissions-table',
  templateUrl: './submissions-table.component.html',
  styleUrls: ['./submissions-table.component.scss']
})
export class SubmissionsTableComponent {
  public getRowParity = getRowParity;

  @Input() todoLines: V2ScheduleLine[] = [];
  @Output() moveToSchedule = new EventEmitter<number>();
}
