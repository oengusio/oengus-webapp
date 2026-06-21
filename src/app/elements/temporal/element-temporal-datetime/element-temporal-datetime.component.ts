import { Component, Input, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemporalServiceService } from '../../../../services/termporal/temporal-service.service';
import { dateTimeFormatKey } from '../../../../services/termporal/config';

@Component({
    selector: 'app-element-temporal-datetime',
    templateUrl: './element-temporal-datetime.component.html',
    styleUrls: ['./element-temporal-datetime.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        CommonModule,
    ]
})
export class ElementTemporalDatetimeComponent {
  temporal = inject(TemporalServiceService);

  @Input() dateTime: string | Temporal.ZonedDateTime = this.temporal.now;
  @Input() format: dateTimeFormatKey = 'mediumDateTime';

  get date(): Temporal.ZonedDateTime {
    return this.temporal.parseDate(this.dateTime);
  }
}
