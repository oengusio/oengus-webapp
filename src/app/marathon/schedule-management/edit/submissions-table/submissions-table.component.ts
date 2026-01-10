import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { V2ScheduleLine } from '../../../../../model/schedule-line';
import { getRowParity } from '../../../../../assets/table';
import { ElementTableComponent } from '../../../../elements/element-table/element-table.component';
import { ElementTableRowComponent } from '../../../../elements/element-table-row/element-table-row.component';
import { ElementTableCellComponent } from '../../../../elements/element-table-cell/element-table-cell.component';
import { SubmissionRowComponent } from './submission-row/submission-row.component';

@Component({
    selector: 'app-submissions-table',
    templateUrl: './submissions-table.component.html',
    styleUrls: ['./submissions-table.component.scss'],
    imports: [
        CommonModule,
        TranslateModule,
        ElementTableComponent,
        ElementTableRowComponent,
        ElementTableCellComponent,
        SubmissionRowComponent,
    ]
})
export class SubmissionsTableComponent {
  public getRowParity = getRowParity;

  @Input() todoLines: V2ScheduleLine[] = [];
  @Input() selectedAvailabilities: string[];
  @Output() moveToSchedule = new EventEmitter<number>();
  @Output() selectAvailability = new EventEmitter<{ username: string, on: boolean }>();
}
