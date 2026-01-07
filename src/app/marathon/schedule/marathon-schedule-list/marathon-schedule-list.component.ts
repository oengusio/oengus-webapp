import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { faGamepad, faLink, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { V2ScheduleLine } from '../../../../model/schedule-line';

@Component({
    selector: 'app-marathon-schedule-list',
    templateUrl: './marathon-schedule-list.component.html',
    styleUrls: ['./marathon-schedule-list.component.scss'],
    standalone: false
})
export class MarathonScheduleListComponent implements OnChanges {
  @Input() runs: V2ScheduleLine[];
  @Input() currentRun: V2ScheduleLine;
  @Input() nextRun: V2ScheduleLine;
  @Input() runHash: string;

  faGamepad = faGamepad;
  faLink = faLink;
  faCircleCheck = faCircleCheck;
  showCopiedPopup: number | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.runHash && changes.runHash.currentValue !== changes.runHash.previousValue) {
      this.scrollToRunHash();
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

  scrollToRunHash(): void {
    if (this.runHash) {
      const runHashRegExp = /^#run-(\d+)$/;
      const runHashResults = runHashRegExp.exec(this.runHash);

      if (runHashResults) {
        const runId = Number.parseInt(runHashResults[1], 10);
        const element = document.getElementById(`run-${runId}`);
        if (element) {
          window.requestAnimationFrame(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          });
        }
      } else if (this.currentRun || this.nextRun) {
        let element: HTMLElement | null = null;
        if (this.runHash === '#current' && this.currentRun) {
          element = document.getElementById(`run-${this.currentRun.id}`);
        } else if (this.runHash === '#next' && this.nextRun) {
          element = document.getElementById(`run-${this.nextRun.id}`);
        }
        if (element) {
          window.requestAnimationFrame(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          });
        }
      }
    }
  }

  copyLinkToClipboard(runId: number, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    
    // Get current URL without hash
    const baseUrl = window.location.href.split('#')[0];
    const link = `${baseUrl}#run-${runId}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(link).then(() => {
      this.showCopiedPopup = runId;
      setTimeout(() => {
        this.showCopiedPopup = null;
      }, 1000);
    }).catch((err) => {
      console.error('Failed to copy link:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = link;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        this.showCopiedPopup = runId;
        setTimeout(() => {
          this.showCopiedPopup = null;
        }, 1000);
      } catch (fallbackErr) {
        console.error('Fallback copy failed:', fallbackErr);
      }
      document.body.removeChild(textArea);
    });
  }
}
