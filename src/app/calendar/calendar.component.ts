import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MarathonCalendarContainerComponent } from './marathon-calendar-container/marathon-calendar-container.component';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
    imports: [
        CommonModule,
        TranslateModule,
        MarathonCalendarContainerComponent,
    ]
})
export class CalendarComponent {
  readonly title = 'Calendar';
}
