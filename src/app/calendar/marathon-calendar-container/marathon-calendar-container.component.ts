import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Marathon } from '../../../model/marathon';
import { MarathonService } from '../../../services/marathon.service';
import { parseInt } from 'lodash';
import { CalendarControllerComponent } from '../calendar-controller/calendar-controller.component';
import { CalendarViewTableComponent } from '../calendar-view-table/calendar-view-table.component';
import { CalendarViewScheduleComponent } from '../calendar-view-schedule/calendar-view-schedule.component';
import { ElementModule } from '../../elements/elements.module';

@Component({
    selector: 'app-marathon-calendar-container',
    templateUrl: './marathon-calendar-container.component.html',
    styleUrls: ['./marathon-calendar-container.component.scss'],
    imports: [
        CommonModule,
        CalendarControllerComponent,
        CalendarViewTableComponent,
        CalendarViewScheduleComponent,
        ElementModule,
    ]
})
export class MarathonCalendarContainerComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private marathonService = inject(MarathonService);

  marathons: Marathon[] = [];

  year: number;
  month: number;

  loading = true;

  tableView = localStorage.getItem('calendar_tableViewBool') !== 'false';

  ngOnInit(): void {
    this.route.params.subscribe(({ year, month }) => {
      this.loading = true;

      const cur = new Date();
      this.year = parseInt(year ?? cur.getFullYear(), 10);
      this.month = parseInt(month ?? cur.getMonth() + 1, 10);

      this.fetchCalendar();
    });
  }

  fetchCalendar(): void {
    this.marathonService.findForMonth(this.calendarParams.start, this.calendarParams.end).subscribe(marathons => {
      this.marathons = marathons;
      this.loading = false;
    });
  }

  get start(): Date {
    return new Date(Date.UTC(this.year, this.month - 1, 0));
  }

  get end(): Date {
    return new Date(Date.UTC(this.year, this.month, 2));
  }

  get calendarParams() {
    return {
      // Fetch a slightly larger range the current month
      start: this.start,
      end: this.end,
      zoneId: 'Etc/UTC',
    };
  }

  get calendarView(): boolean {
    return !this.tableView;
  }

  set calendarView(value: boolean) {
    this.tableView = !value;

    localStorage.setItem('calendar_tableViewBool', `${this.tableView}`);
  }

}
