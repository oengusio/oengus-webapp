import { Component, Input, OnInit } from '@angular/core';
import { ScheduleLine } from '../../../../../model/schedule-line';

@Component({
  selector: 'app-marathon-schedule-list',
  templateUrl: './marathon-schedule-list.component.html',
  styleUrls: ['./marathon-schedule-list.component.scss']
})
export class MarathonScheduleListComponent implements OnInit {

  @Input() runs: ScheduleLine[];
  @Input() runHash: string;

  constructor() { }

  ngOnInit(): void {
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

}
