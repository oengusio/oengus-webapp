import {Component, OnInit, ViewChild} from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import {MarathonService} from '../../services/marathon.service';
import {Router} from '@angular/router';
import {CalendarOptions, EventClickArg} from '@fullcalendar/core'; // useful for typechecking
import {DatesSetArg, FullCalendarComponent} from '@fullcalendar/angular';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @ViewChild('calendar', {static: true}) calendarComponent: FullCalendarComponent;

  public events = [];
  public calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    locale: localStorage.getItem('language'),
    events: this.events,
    eventClick: this.goToEvent.bind(this),
    datesSet: this.fetchMarathons.bind(this),
    now: function () {
      const prevDate = localStorage.getItem('calendar-prev-day');

      if (prevDate) {
        return new Date(prevDate);
      }

      return new Date();
    },
  };

  constructor(private marathonService: MarathonService,
              private router: Router) {
  }

  ngOnInit() {
    //
  }

  fetchMarathons(info: DatesSetArg) {
    this.marathonService.findForMonth(info.view.activeStart, info.view.activeEnd).subscribe(response => {
      this.events = [];
      response.forEach(marathon => {
        this.events.push({
          id: marathon.id,
          title: marathon.name,
          start: marathon.startDate,
          end: marathon.endDate
        });
      });
      this.calendarOptions.events = this.events;
      this.calendarComponent.getApi().refetchEvents();
      localStorage.removeItem('calendar-prev-day');
    });
  }

  goToEvent(eventClickInfo: EventClickArg) {
    localStorage.setItem('calendar-prev-day', eventClickInfo.event.startStr);

    this.router.navigate(['/marathon', eventClickInfo.event.id]);
  }

  get title(): string {
    return 'Calendar';
  }
}
