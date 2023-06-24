import { Component, Input } from '@angular/core';
import { ScheduleLine } from '../../../../model/schedule-line';

@Component({
  selector: 'app-run-details',
  templateUrl: './run-details.component.html',
  styleUrls: ['./run-details.component.scss'],
})
export class RunDetailsComponent {
  @Input() run: ScheduleLine;

  get titleText(): string | null {
    return this.run.setupBlock ? (this.run.setupBlockText || null) : this.run.gameName;
  }
}
