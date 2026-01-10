import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { V2ScheduleLine } from '../../../../../../model/schedule-line';
import { DurationService } from '../../../../../../services/duration.service';
import moment from 'moment-timezone';

@Component({
    selector: 'app-setup-block-editor',
    templateUrl: './setup-block-editor.component.html',
    styleUrls: ['./setup-block-editor.component.scss'],
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
    ]
})
export class SetupBlockEditorComponent implements OnInit {
  @Output() setupTimeChanged = new EventEmitter<string>();

  @Input() line: V2ScheduleLine;
  @Input() i: number;

  humanSetupTime = '00:00:00';

  ngOnInit(): void {
    this.humanSetupTime = DurationService.toHuman(this.line.setupTime);
  }

  onSetupTimeBlur(): void {
    this.line.setupTime = moment.duration(this.humanSetupTime).toISOString();
    this.setupTimeChanged.emit(this.line.setupTime);
  }
}
