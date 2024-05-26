import { Component, EventEmitter, Input, Output } from '@angular/core';
import { V2ScheduleLine } from '../../../../../../model/schedule-line';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-submission-row',
  templateUrl: './submission-row.component.html',
  styleUrls: ['./submission-row.component.scss']
})
export class SubmissionRowComponent {
  iconChevronRight = faChevronRight;

  @Input() i: number;
  @Input() line: V2ScheduleLine;
  @Output() moveToSchedule = new EventEmitter<number>();
}
