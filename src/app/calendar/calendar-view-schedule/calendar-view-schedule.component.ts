import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, inject } from '@angular/core';
import { Marathon } from '../../../model/marathon';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import { Router } from '@angular/router';
import { LocaleService } from '../../../services/locale.service';

@Component({
    selector: 'app-calendar-view-schedule',
    templateUrl: './calendar-view-schedule.component.html',
    styleUrl: './calendar-view-schedule.component.scss',
    standalone: false
})
export class CalendarViewScheduleComponent implements OnInit, OnChanges {
  private router = inject(Router);
  private localeService = inject(LocaleService);

  @Input() year: number;
  @Input() month: number;
  @Input() marathons: Marathon[] = [];

  @ViewChild('calendar', { static: true }) calendarComponent: FullCalendarComponent;

  public calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    locale: localStorage.getItem('language'),
    firstDay: 1,
    headerToolbar: {
      left: '',
      center: '',
      right: '',
    },
    navLinks: false,
    events: this.events,
    eventClick: this.goToEvent.bind(this),
  };

  ngOnInit(): void {
    this.calendarOptions.locale = this.localeService.language;
    this.setInitialDate();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.marathons) {
      this.calendarOptions.events = this.events;

      const api = this.calendarComponent.getApi();

      if (api) {
        api.refetchEvents();
      }
    }
  }

  setInitialDate(): void {
    let initialDate = new Date();
    const normalisedMonth = this.month - 1;

    if (initialDate.getMonth() !== normalisedMonth) {
      initialDate = new Date(this.year, normalisedMonth, 1);
    }

    this.calendarOptions.initialDate = initialDate;
  }

  // If keydown ctrl or middle mouse button open in new tab?
  // Or just always open in new tab?
  goToEvent(eventClickInfo: EventClickArg) {
    this.router.navigate(['/marathon', eventClickInfo.event.id]);
  }

  get events() {
    return this.marathons.map((it) => ({
      id: it.id,
      title: it.name,
      start: it.startDate,
      end: it.endDate,
    }));
  }

}
