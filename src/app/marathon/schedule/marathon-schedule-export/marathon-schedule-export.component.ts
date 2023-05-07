import { Component } from '@angular/core';
import { ScheduleService } from '../../../../services/schedule.service';
import { MarathonService } from '../../../../services/marathon.service';

@Component({
  selector: 'app-marathon-schedule-export',
  templateUrl: './marathon-schedule-export.component.html',
  styleUrls: ['./marathon-schedule-export.component.scss']
})
export class MarathonScheduleExportComponent {

  formats = [ 'ics', 'csv', 'json' ];

  constructor(private scheduleService: ScheduleService, private marathonService: MarathonService) { }

  getExportUrl(format: string) {
    return this.scheduleService.getExportUrl(this.marathonService.marathon.id, format);
  }

}
