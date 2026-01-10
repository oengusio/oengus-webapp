import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { V2ScheduleLine } from '../../../../../../model/schedule-line';
import { faCalendarTimes, faCalendarWeek, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { getRunnerDisplayName, getRunnerUsername } from '../../../../../../utils/helpers';
import { ElementTableRowComponent } from '../../../../../elements/element-table-row/element-table-row.component';
import { ElementTableCellComponent } from '../../../../../elements/element-table-cell/element-table-cell.component';
import { ElementTemporalDurationComponent } from '../../../../../elements/temporal/element-temporal-duration/element-temporal-duration.component';
import { RouterModule } from '@angular/router';
import { LocalizeRouterModule } from '@oengusio/ngx-translate-router';

@Component({
    selector: 'app-submission-row',
    templateUrl: './submission-row.component.html',
    styleUrls: ['./submission-row.component.scss'],
    imports: [
        CommonModule,
        TranslateModule,
        FontAwesomeModule,
        ElementTableRowComponent,
        ElementTableCellComponent,
        ElementTemporalDurationComponent,
        RouterModule,
        LocalizeRouterModule,
    ]
})
export class SubmissionRowComponent {
  iconChevronRight = faChevronRight;
  iconCalendarWeek = faCalendarWeek;
  iconCalendarTimes = faCalendarTimes;
  getRunnerUsername = getRunnerUsername;
  getRunnerDisplayName = getRunnerDisplayName;

  @Input() i: number;
  @Input() line: V2ScheduleLine;
  @Input() selectedAvailabilities: string[] = [];
  @Output() moveToSchedule = new EventEmitter<number>();
  @Output() selectAvailability = new EventEmitter<{ username: string, on: boolean }>();
}
