import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Marathon } from '../../../model/marathon';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar-view-schedule',
  templateUrl: './calendar-view-schedule.component.html',
  styleUrl: './calendar-view-schedule.component.scss'
})
export class CalendarViewScheduleComponent implements OnInit, OnChanges {
  @Input() year: number;
  @Input() month: number;
  @Input() marathons: Marathon[] = [];

  @ViewChild('calendar', { static: true }) calendarComponent: FullCalendarComponent;

  public calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    locale: localStorage.getItem('language'),
    headerToolbar: {
      left: '',
      center: '',
      right: '',
    },
    navLinks: false,
    events: this.events,
    eventClick: this.goToEvent.bind(this),
    // datesSet: this.fetchMarathons.bind(this),
    now: () => {
      const currDate = new Date();
      const normalisedMonth = this.month - 1;

      console.log(currDate.getMonth(), normalisedMonth);

      if (currDate.getMonth() !== normalisedMonth) {
        return new Date(this.year, this.month, 0);
      }

      return currDate;
    },
  };

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    //
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

  // If keydown or middle mouse button open in new tab?
  // Or just always open in new tab?
  goToEvent(eventClickInfo: EventClickArg) {
    // localStorage.setItem('calendar-prev-day', eventClickInfo.event.startStr);

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
