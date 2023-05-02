import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../../../../../services/schedule.service';

@Component({
  selector: 'app-marathon-schedule-export',
  templateUrl: './marathon-schedule-export.component.html',
  styleUrls: ['./marathon-schedule-export.component.scss']
})
export class MarathonScheduleExportComponent implements OnInit {

  formats = [ 'ics', 'csv', 'json' ];

  constructor(private scheduleService: ScheduleService) { }

  ngOnInit(): void {
  }

}
