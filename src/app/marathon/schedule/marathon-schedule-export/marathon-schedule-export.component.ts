import { Component, Input } from '@angular/core';
import { ScheduleService } from '../../../../services/schedule.service';
import { MarathonService } from '../../../../services/marathon.service';
import { downloadBlob } from '../../../../utils/helpers';
import { LoadingBarService } from '../../../../services/loading-bar.service';

@Component({
    selector: 'app-marathon-schedule-export',
    templateUrl: './marathon-schedule-export.component.html',
    styleUrls: ['./marathon-schedule-export.component.scss'],
    standalone: false
})
export class MarathonScheduleExportComponent {
  @Input() scheduleId: number;
  @Input() disabled: boolean;

  formats = [ 'ics', 'csv', 'json' ];

  constructor(
    private scheduleService: ScheduleService,
    private marathonService: MarathonService,
    private loadingBar: LoadingBarService,
  ) { }

  runExport(format: string, event: Event) {
    event.preventDefault();

    const marathonId = this.marathonService.marathon.id;
    this.loadingBar.setLoading(true);

    this.scheduleService.fetchExport(
      marathonId,
      this.scheduleId,
      format
    ).subscribe((download) => {
      const extension = download.type.split('/')[1].replace('calendar', 'ics');

      downloadBlob(download, `${marathonId}-schedule-${this.scheduleId}.${extension}`);
      this.loadingBar.setLoading(false);
    });

    return false;
  }
}
