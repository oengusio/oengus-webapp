import { Component, Input, OnInit } from '@angular/core';
import { ScheduleLine } from '../../../../model/schedule-line';

@Component({
  selector: 'app-run-details',
  templateUrl: './run-details.component.html',
  styleUrls: ['./run-details.component.scss'],
})
export class RunDetailsComponent implements OnInit {
  @Input() run: ScheduleLine;


  constructor() {
  }

  ngOnInit(): void {
  }

}
