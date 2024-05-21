import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { V2ScheduleLine } from '../../../../../model/schedule-line';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { getRowParity } from '../../../../../assets/table';

@Component({
  selector: 'app-submissions-table',
  templateUrl: './submissions-table.component.html',
  styleUrls: ['./submissions-table.component.scss']
})
export class SubmissionsTableComponent implements OnInit {
  public iconChevronRight = faChevronRight;
  public getRowParity = getRowParity;

  @Input() todoLines: V2ScheduleLine[] = [];
  @Output() moveToSchedule = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }
}
