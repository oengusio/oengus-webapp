import { Component, EventEmitter, Input, Output } from '@angular/core';
import { V2ScheduleLine } from '../../../../../model/schedule-line';
import { getRowParity } from '../../../../../assets/table';

@Component({
    selector: 'app-submissions-table',
    templateUrl: './submissions-table.component.html',
    styleUrls: ['./submissions-table.component.scss'],
    standalone: false
})
export class SubmissionsTableComponent {
  public getRowParity = getRowParity;

  @Input() todoLines: V2ScheduleLine[] = [];
  @Input() selectedAvailabilities: Array<string>;
  @Output() moveToSchedule = new EventEmitter<number>();
  @Output() selectAvailability = new EventEmitter<{ username: string, on: boolean }>();
}
