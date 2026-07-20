import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule } from '@oengusio/ngx-translate-router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { ElementModule } from '../../elements/elements.module';
import { NwbSwitchComponent } from '../../components/wizi/switch/switch.component';

interface CalendarLinkInfo {
  year: number;
  month: number;
}

@Component({
    selector: 'app-calendar-controller',
    templateUrl: './calendar-controller.component.html',
    styleUrls: ['./calendar-controller.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TranslateModule,
    LocalizeRouterModule,
    FontAwesomeModule,
    ElementModule,
    NwbSwitchComponent,
  ],
})
export class CalendarControllerComponent {
  @Input() year = -1;
  @Input() month = -1;
  @Input() calendarView = false;
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
