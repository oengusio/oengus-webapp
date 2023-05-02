import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ScheduleLine } from '../../../../../model/schedule-line';
import { toggleTableExpand } from '../../../../../assets/table';

@Component({
  selector: 'app-marathon-schedule-list',
  templateUrl: './marathon-schedule-list.component.html',
  styleUrls: ['./marathon-schedule-list.component.scss']
})
export class MarathonScheduleListComponent implements OnChanges {
  @Input() runs: ScheduleLine[];
  @Input() currentRun: ScheduleLine;
  @Input() nextRun: ScheduleLine;
  @Input() runHash: string;

  expanded = new Set<number>();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.runHash && changes.runHash.currentValue !== changes.runHash.previousValue) {
      this.expandRunHash();
    }
  }

  shouldShowDay(index: number): boolean {
    // Always show the day header at the top
    if (index === 0) {
      return true;
    }

    if (!this.runs[index]) {
      return false;
    }

    // Otherwise, only show when the day transitioned
    const currentRun = new Date(this.runs[index].date);
    // We have an implicit index test for the index=0 case, so this is always safe
    const previousRun = new Date(this.runs[index - 1].date);

    return currentRun.getDate() !== previousRun.getDate() ||
      currentRun.getMonth() !== previousRun.getMonth() ||
      currentRun.getFullYear() !== previousRun.getFullYear();
  }

  getRowParity(index: number, run: ScheduleLine): { 'is-primary': boolean, 'is-even': boolean, 'is-odd': boolean } {
    return {
      'is-even': index % 2 === 0,
      'is-odd': index % 2 === 1,
      'is-primary': run.id === this.currentRun?.id,
    };
  }

  getId(run: ScheduleLine): string|undefined {
    switch (run.id) {
      case this.currentRun?.id:
        return 'current';
      case this.nextRun?.id:
        return 'next';
      default:
        return undefined;
    }
  }

  expandRunHash(): void {
    if (this.runHash) {
      const runHashRegExp = /^#run-(\d+)$/;
      const runHashResults = runHashRegExp.exec(this.runHash);
      if (runHashResults) {
        this.toggleExpand(Number.parseInt(runHashResults[1], 10), true);
      } else if (this.currentRun || this.nextRun) {
        if (this.runHash === '#current') {
          this.toggleExpand(this.currentRun?.id, true);
        } else if (this.runHash === '#next') {
          this.toggleExpand(this.nextRun?.id, true);
        }
      }
    }
  }

  toggleExpand(runId: number, openOnly = false): void {
    toggleTableExpand(this.expanded, runId, openOnly);
    this.expanded = new Set(this.expanded);
  }
}
