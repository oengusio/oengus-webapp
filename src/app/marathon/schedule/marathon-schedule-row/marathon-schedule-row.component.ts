import { Component, Input } from '@angular/core';
import { V2ScheduleLine } from '../../../../model/schedule-line';

@Component({
  selector: 'app-marathon-schedule-row',
  templateUrl: './marathon-schedule-row.component.html',
  styleUrls: ['./marathon-schedule-row.component.scss'],
})
export class MarathonScheduleRowComponent {
  @Input() run: V2ScheduleLine;
  @Input() expanded = false;
  @Input() internalId: string;
}
