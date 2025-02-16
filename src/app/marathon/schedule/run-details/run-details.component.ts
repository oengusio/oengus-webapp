import { Component, Input } from '@angular/core';
import { V2ScheduleLine } from '../../../../model/schedule-line';

@Component({
    selector: 'app-run-details',
    templateUrl: './run-details.component.html',
    styleUrls: ['./run-details.component.scss'],
    standalone: false
})
export class RunDetailsComponent {
  @Input() run: V2ScheduleLine;

  get titleText(): string | null {
    return this.run.setupBlock ? (this.run.setupBlockText || null) : this.run.game;
  }
}
