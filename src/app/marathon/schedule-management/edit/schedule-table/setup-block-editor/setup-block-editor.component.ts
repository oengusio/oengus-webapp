import { Component, EventEmitter, Input, Output } from '@angular/core';
import { V2ScheduleLine } from '../../../../../../model/schedule-line';
import { DurationService } from '../../../../../../services/duration.service';
import moment from 'moment-timezone';
import { debounce } from 'lodash';

@Component({
  selector: 'app-setup-block-editor',
  templateUrl: './setup-block-editor.component.html',
  styleUrls: ['./setup-block-editor.component.scss']
})
export class SetupBlockEditorComponent {
  @Output() setupTimeChanged = new EventEmitter<string>();

  @Input() line: V2ScheduleLine;
  @Input() i: number;

  updateSetupTimeDebounce = debounce(this.updateSetupTime, 1000);

  get lineSetup(): string {
    return DurationService.toHuman(this.line.setupTime);
  }

  set lineSetup(value: string) {
    this.updateSetupTimeDebounce(value);
  }

  updateSetupTime(value: string) {
    this.line.setupTime = moment.duration(value).toISOString();

    this.setupTimeChanged.emit(this.line.setupTime);
  }
}
