import { Component, ElementRef, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { V2ScheduleLine } from '../../../../model/schedule-line';

@Component({
    selector: 'app-marathon-schedule-row',
    templateUrl: './marathon-schedule-row.component.html',
    styleUrls: ['./marathon-schedule-row.component.scss'],
    standalone: false
})
export class MarathonScheduleRowComponent implements OnChanges {
  private elRef = inject(ElementRef);

  @Input() run: V2ScheduleLine;
  @Input() expanded = false;
  @Input() runHash: string;
  @Input() internalId: string;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.runHash) {
      const currHash = changes.runHash.currentValue;

      if (currHash.endsWith(this.run.id) || currHash.endsWith(this.internalId)) {
        window.requestAnimationFrame(() => {
          this.elRef.nativeElement.firstChild.firstChild.scrollIntoView({ behavior: 'smooth' });
        });
      }
    }
  }
}
