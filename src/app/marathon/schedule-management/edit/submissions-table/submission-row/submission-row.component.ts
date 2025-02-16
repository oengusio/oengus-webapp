import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LineRunner, V2ScheduleLine } from '../../../../../../model/schedule-line';
import { faCalendarTimes, faCalendarWeek, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { getRunnerDisplayName, getRunnerUsername } from '../../../../../../utils/helpers';

@Component({
    selector: 'app-submission-row',
    templateUrl: './submission-row.component.html',
    styleUrls: ['./submission-row.component.scss'],
    standalone: false
})
export class SubmissionRowComponent {
  iconChevronRight = faChevronRight;
  iconCalendarWeek = faCalendarWeek;
  iconCalendarTimes = faCalendarTimes;
  getRunnerUsername = getRunnerUsername;
  getRunnerDisplayName = getRunnerDisplayName;

  @Input() i: number;
  @Input() line: V2ScheduleLine;
  @Input() selectedAvailabilities: Array<string> = [];
  @Output() moveToSchedule = new EventEmitter<number>();
  @Output() selectAvailability = new EventEmitter<{ username: string, on: boolean }>();
}
