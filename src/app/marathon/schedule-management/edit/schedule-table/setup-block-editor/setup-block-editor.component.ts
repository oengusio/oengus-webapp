import { Component, Input, OnInit } from '@angular/core';
import { V2ScheduleLine } from '../../../../../../model/schedule-line';
import { DurationService } from '../../../../../../services/duration.service';
import moment from 'moment-timezone';

@Component({
  selector: 'app-setup-block-editor',
  templateUrl: './setup-block-editor.component.html',
  styleUrls: ['./setup-block-editor.component.scss']
})
export class SetupBlockEditorComponent implements OnInit {

  @Input() line: V2ScheduleLine;
  @Input() i: number;

  constructor() { }

  ngOnInit(): void {
  }

  get lineSetup(): string {
    return DurationService.toHuman(this.line.setupTime);
  }

  set lineSetup(value: string) {
    this.line.setupTime = moment.duration(value).toISOString();
  }
}
