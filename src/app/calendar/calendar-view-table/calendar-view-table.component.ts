import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Marathon } from 'src/model/marathon';

interface CalendarType {
  datetime: string;
  marathons: Marathon[];
  endtime?: string;
}

@Component({
    selector: 'app-calendar-view-table',
    templateUrl: './calendar-view-table.component.html',
    styleUrls: ['./calendar-view-table.component.scss'],
    standalone: false
})
export class CalendarViewTableComponent implements OnInit, OnChanges {
  @Input() year: number;
  @Input() month: number;
  @Input() marathons: Marathon[] = [];

  // TODO: HACK
  //  ngFor calls this.dailyCalendars multiple times, breaking routerLinkActive (angular bug?).
  realDaylyCallendars: CalendarType[];

  ngOnInit(): void {
    this.realDaylyCallendars = this.generateDailyCalendars(this.marathons);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.marathons) {
      this.realDaylyCallendars = this.generateDailyCalendars(changes.marathons.currentValue);
    }
  }

  isToday(firstDay: string|Date, lastDay?: string|Date): { 'is-primary': boolean, 'is-info': boolean } {
    if (typeof firstDay === 'string') {
      firstDay = new Date(firstDay);
    }
    if (typeof lastDay === 'string') {
      lastDay = new Date(lastDay);
    }
    lastDay ??= firstDay;
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const isToday = firstDay.getTime() <= today && today <= lastDay.getTime();
    return {
      'is-primary': isToday,
      'is-info': !isToday,
    };
  }

  getClasses(index: number): { 'is-even': boolean, 'is-odd': boolean } {
    return {
      'is-even': index % 2 === 0,
      'is-odd': index % 2 === 1,
    };
  }

  getMarathons(day: number, marathonList: Marathon[]): Marathon[]|undefined {
    const dayStart = new Date(this.year, this.month - 1, day);
    const dayEnd = new Date(this.year, this.month - 1, day + 1);
    return marathonList.filter(marathon => new Date(marathon.endDate) > dayStart && new Date(marathon.startDate) < dayEnd);
  }

  private generateDailyCalendars(marathonList: Marathon[]): CalendarType[] {
    const dailyCalendars: CalendarType[] = [];
    let startNoMarathonRun: Date|undefined;
    const days = new Date(this.year, this.month, 0).getDate();

    for (let day = 1; day <= days; day++) {
      const marathons = this.getMarathons(day, marathonList);

      if (marathons?.length) {
        if (startNoMarathonRun) {
          dailyCalendars.push({
            datetime: new Date(this.year, this.month - 1, day - 1).toISOString(),
            marathons: [],
            endtime: startNoMarathonRun.toISOString(),
          });
          startNoMarathonRun = undefined;
        }
        dailyCalendars.push({
          datetime: new Date(this.year, this.month - 1, day).toISOString(),
          marathons: marathons,
        });
      } else if (!startNoMarathonRun) {
        startNoMarathonRun = new Date(this.year, this.month - 1, day);
      }
    }

    // If the month ends on a non-run day
    if (startNoMarathonRun) {
      dailyCalendars.push({
        datetime: new Date(this.year, this.month, 0).toISOString(),
        marathons: [],
        endtime: startNoMarathonRun.toISOString(),
      });
    }

    return dailyCalendars;
  }
}
