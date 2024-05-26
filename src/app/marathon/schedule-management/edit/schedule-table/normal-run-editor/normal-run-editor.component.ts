import { Component, Input } from '@angular/core';
import { V2ScheduleLine } from '../../../../../../model/schedule-line';
import { DurationService } from '../../../../../../services/duration.service';
import moment from 'moment-timezone';

@Component({
  selector: 'app-normal-run-editor',
  templateUrl: './normal-run-editor.component.html',
  styleUrls: ['./normal-run-editor.component.scss']
})
export class NormalRunEditorComponent {
  // TODO: emit event when line estimate or setup time is updated so we can re-compute the schedule times.

  @Input() line: V2ScheduleLine;
  @Input() i: number;

  get lineEstimate(): string {
    return DurationService.toHuman(this.line.estimate);
  }

  set lineEstimate(value: string) {
    this.line.estimate = moment.duration(value).toISOString();
  }

  get lineSetup(): string {
    return DurationService.toHuman(this.line.setupTime);
  }

  set lineSetup(value: string) {
    this.line.setupTime = moment.duration(value).toISOString();
  }
}
