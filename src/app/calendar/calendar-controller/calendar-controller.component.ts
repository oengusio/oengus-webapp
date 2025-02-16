import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

interface CalendarLinkInfo {
  year: number;
  month: number;
}

@Component({
    selector: 'app-calendar-controller',
    templateUrl: './calendar-controller.component.html',
    styleUrls: ['./calendar-controller.component.scss'],
    standalone: false
})
export class CalendarControllerComponent {
  @Input() year: number;
  @Input() month: number;

  @Input() calendarView: boolean;
  @Output() calendarViewChange = new EventEmitter<boolean>();

  iconLeft = faCaretLeft;
  iconRight = faCaretRight;

  changeCalendarView(newVal: boolean): void {
    this.calendarViewChange.emit(newVal);
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
