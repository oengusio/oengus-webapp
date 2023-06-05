import { Component, OnInit } from '@angular/core';
import { Marathon } from '../../../model/marathon';
import { ActivatedRoute } from '@angular/router';
import { MarathonService } from '../../../services/marathon.service';

@Component({
  selector: 'app-marathon-calendar-container',
  templateUrl: './marathon-calendar-container.component.html',
  styleUrls: ['./marathon-calendar-container.component.scss']
})
export class MarathonCalendarContainerComponent implements OnInit {
  marathons: Marathon[] = [];

  year: number;
  month: number;

  loading = true;

  constructor(private route: ActivatedRoute,
              private marathonService: MarathonService) {
    this.route.params.subscribe(({ year, month }) => {
      const cur = new Date();
      this.year = parseInt(year ?? cur.getFullYear(), 10);
      this.month = parseInt(month ?? cur.getMonth() + 1, 10);
    });
  }

  ngOnInit(): void {
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

}
