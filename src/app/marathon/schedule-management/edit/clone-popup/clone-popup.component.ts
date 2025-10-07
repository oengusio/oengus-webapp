import { Component, Input, OnInit, inject } from '@angular/core';
import { ScheduleService } from '../../../../../services/schedule.service';
import { MarathonService } from '../../../../../services/marathon.service';
import { ScheduleInfo } from '../../../../../model/schedule';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-clone-popup',
    templateUrl: './clone-popup.component.html',
    styleUrl: './clone-popup.component.scss',
    standalone: false
})
export class ClonePopupComponent implements OnInit {
  private scheduleService = inject(ScheduleService);
  private marathonService = inject(MarathonService);

  @Input() selfId: number;

  loading = false;
  open = false;

  cloneFromScheduleId = -1;

  schedules: ScheduleInfo[] = [];

  private marathonId: string;

  ngOnInit(): void {
    this.marathonId = this.marathonService.marathon.id;
  }

  openClonePopup(): void {
    // 1. set dialog to open
    this.open = true;
    this.loading = true;

    // 2. load all schedules in the dropdown
    this.scheduleService.getAllOverview(this.marathonId).subscribe((schedules) => {
      // 3. remove own schedule
      this.schedules = schedules.filter((it) => it.id !== this.selfId);

      // TODO: 4. show error if no other schedules

      // 5. disable loading.
      this.loading = false;
    });
  }

  // TODO: handle errors & translations
  async startImport(): Promise<void> {
    try {
      if (this.cloneFromScheduleId < 0) {
        return;
      }

      this.loading = true;

      const { data: lines } = await firstValueFrom(
        this.scheduleService.getLines(this.marathonId, this.cloneFromScheduleId)
      );

      // Strip all ids of all lines to make sure that we are not moving the lines to a different schedule.
      lines.forEach((line) => {
        line.id = -1;
      });

      await firstValueFrom(
        this.scheduleService.updateLines(this.marathonId, this.selfId, lines)
      );

      this.open = false;
      window.location.reload();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Error cloning schedule:', error);
      alert('TODO: proper error handling ' + error.message);
    }
  }

  cancelPopup(): void {
    this.open = false;
    this.cloneFromScheduleId = -1;
  }
}
