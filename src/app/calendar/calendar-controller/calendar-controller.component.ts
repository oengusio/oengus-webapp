import { Component, Input, OnInit } from '@angular/core';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

interface CalendarLinkInfo {
  year: number;
  month: number;
}

@Component({
  selector: 'app-calendar-controller',
  templateUrl: './calendar-controller.component.html',
  styleUrls: ['./calendar-controller.component.scss']
})
export class CalendarControllerComponent implements OnInit {
  @Input() year: number;
  @Input() month: number;

  iconLeft = faCaretLeft;
  iconRight = faCaretRight;

  constructor() { }

  ngOnInit(): void {
  }

  get datetime(): string {
    return new Date(this.year, this.month - 1).toISOString();
  }

  get previousCalendar(): CalendarLinkInfo {
    return {
      year: this.month !== 1 ? this.year : this.year - 1,
      month: this.month !== 1 ? this.month - 1 : 12,
    };
  }

  get nextCalendar(): CalendarLinkInfo {
    return {
      year: this.month !== 12 ? this.year : this.year + 1,
      month: this.month !== 12 ? this.month + 1 : 1,
    };
  }
}
