import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule } from '@oengusio/ngx-translate-router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NwbSwitchModule } from '@oengus/ng-wizi-bulma';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { ElementModule } from '../../elements/elements.module';

interface CalendarLinkInfo {
  year: number;
  month: number;
}

@Component({
    selector: 'app-calendar-controller',
    templateUrl: './calendar-controller.component.html',
    styleUrls: ['./calendar-controller.component.scss'],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        TranslateModule,
        LocalizeRouterModule,
        FontAwesomeModule,
        NwbSwitchModule,
        ElementModule,
    ]
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
