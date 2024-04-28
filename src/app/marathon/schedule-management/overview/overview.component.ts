import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScheduleInfo } from '../../../../model/schedule';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  schedules: ScheduleInfo[] = [];

  constructor(
    private route: ActivatedRoute,
  ) {
    this.schedules = this.route.snapshot.data.schedules;
  }

  ngOnInit(): void {
    console.log(this.schedules);
  }

}
