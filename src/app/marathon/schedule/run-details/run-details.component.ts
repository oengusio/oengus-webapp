import { Component, Input } from '@angular/core';
import { ScheduleLine } from '../../../../model/schedule-line';

@Component({
  selector: 'app-run-details',
  templateUrl: './run-details.component.html',
  styleUrls: ['./run-details.component.scss'],
})
export class RunDetailsComponent {
  @Input() run: ScheduleLine;
}
