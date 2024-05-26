import { Component, Input } from '@angular/core';
import { V2ScheduleLine } from '../../../../../../model/schedule-line';
import { DurationService } from '../../../../../../services/duration.service';
import moment from 'moment-timezone';

@Component({
  selector: 'app-setup-block-editor',
  templateUrl: './setup-block-editor.component.html',
  styleUrls: ['./setup-block-editor.component.scss']
})
export class SetupBlockEditorComponent {
  // TODO: emit event when line setup time is updated so we can re-compute the schedule times.

  @Input() line: V2ScheduleLine;
  @Input() i: number;

  get lineSetup(): string {
    return DurationService.toHuman(this.line.setupTime);
  }

  set lineSetup(value: string) {
    this.line.setupTime = moment.duration(value).toISOString();
  }
}
