import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ScheduleService } from '../../../../services/schedule.service';
import { MarathonService } from '../../../../services/marathon.service';
import { downloadBlob } from '../../../../utils/helpers';
import { LoadingBarService } from '../../../../services/loading-bar.service';
import { ElementDropdownComponent } from '../../../elements/element-dropdown/element-dropdown.component';

@Component({
    selector: 'app-marathon-schedule-export',
    templateUrl: './marathon-schedule-export.component.html',
    styleUrls: ['./marathon-schedule-export.component.scss'],
    imports: [
        CommonModule,
        TranslateModule,
        ElementDropdownComponent,
    ]
})
export class MarathonScheduleExportComponent {
  private scheduleService = inject(ScheduleService);
  private marathonService = inject(MarathonService);
  private loadingBar = inject(LoadingBarService);

  @Input() scheduleId: number;
  @Input() disabled: boolean;

  formats = [ 'ics', 'csv', 'json', 'gdq' ];

  runExport(format: string, event: Event) {
    event.preventDefault();

    if (format === 'gdq') {
      window.open('https://github.com/oengusio/gdq-tracker-import', '_blank');
      return;
    }

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
