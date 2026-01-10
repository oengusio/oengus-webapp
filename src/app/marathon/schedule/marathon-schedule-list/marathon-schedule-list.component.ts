import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGamepad, faLink, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { V2ScheduleLine } from '../../../../model/schedule-line';
import { toggleTableExpand } from '../../../../assets/table';
import { ElementModule } from '../../../elements/elements.module';
import { ComponentsModule } from '../../../components/components.module';

@Component({
    selector: 'app-marathon-schedule-list',
    templateUrl: './marathon-schedule-list.component.html',
    styleUrls: ['./marathon-schedule-list.component.scss'],
    imports: [
        CommonModule,
        TranslateModule,
        FontAwesomeModule,
        ElementModule,
        ComponentsModule,
    ]
})
export class MarathonScheduleListComponent implements OnChanges, OnInit {
  @Input() runs: V2ScheduleLine[];
  @Input() currentRun: V2ScheduleLine;
  @Input() nextRun: V2ScheduleLine;
  @Input() runHash: string;

  faGamepad = faGamepad;
  faLink = faLink;
  faCircleCheck = faCircleCheck;
  showCopiedPopup: number | null = null;
  expanded = new Set<number>();

  ngOnInit(): void {
    this.expandRunHash();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.runHash && changes.runHash.currentValue !== changes.runHash.previousValue) {
      this.expandRunHash();
    }

    if (changes.runs) {
      this.expanded.clear();
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

  getRowParity(index: number, run: V2ScheduleLine): { 'is-primary': boolean, 'is-even': boolean, 'is-odd': boolean } {
    return {
      'is-even': index % 2 === 0,
      'is-odd': index % 2 === 1,
      'is-primary': run.id === this.currentRun?.id,
    };
  }

  getId(run: V2ScheduleLine): string {
    // Always return run-{id} for clipboard links to work
    return `run-${run.id}`;
  }

  getCurrentId(): string | undefined {
    return this.currentRun ? `run-${this.currentRun.id}` : undefined;
  }

  getNextId(): string | undefined {
    return this.nextRun ? `run-${this.nextRun.id}` : undefined;
  }

  isBeforeCurrentRun(run: V2ScheduleLine): boolean {
    if (!this.currentRun || !this.runs) {
      return false;
    }
    const currentIndex = this.runs.findIndex(r => r.id === this.currentRun.id);
    const runIndex = this.runs.findIndex(r => r.id === run.id);
    return runIndex >= 0 && currentIndex >= 0 && runIndex < currentIndex;
  }

  expandRunHash(): void {
    if (this.runHash) {
      const runHashRegExp = /^#run-(\d+)$/;
      const runHashResults = runHashRegExp.exec(this.runHash);

      if (runHashResults) {
        const runId = Number.parseInt(runHashResults[1], 10);
        this.toggleExpand(runId, true);
        this.scrollToRun(runId);
      } else if (this.currentRun || this.nextRun) {
        if (this.runHash === '#current' && this.currentRun) {
          this.toggleExpand(this.currentRun.id, true);
          this.scrollToRun(this.currentRun.id);
        } else if (this.runHash === '#next' && this.nextRun) {
          this.toggleExpand(this.nextRun.id, true);
          this.scrollToRun(this.nextRun.id);
        }
      }
    }
  }

  scrollToRun(runId: number): void {
    setTimeout(() => {
      const element = document.getElementById(`run-${runId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  }

  toggleExpand(runId: number, openOnly = false): void {
    toggleTableExpand(this.expanded, runId, openOnly);
    this.expanded = new Set(this.expanded);
  }

  copyLinkToClipboard(runId: number, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    
    // Get current URL without hash
    const { origin, pathname } = window.location
    const baseUrl = origin + pathname;
    const link = `${baseUrl}#run-${runId}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(link).then(() => {
      this.showCopiedPopup = runId;
      setTimeout(() => {
        this.showCopiedPopup = null;
      }, 1000);
    }).catch((err) => {
      console.error('Failed to copy link:', err);
    });
  }
}
