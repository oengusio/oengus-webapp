import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemporalServiceService } from '../../../../services/termporal/temporal-service.service';
import { dateTimeFormatKey } from '../../../../services/termporal/config';

@Component({
    selector: 'app-element-temporal-datetime',
    templateUrl: './element-temporal-datetime.component.html',
    styleUrls: ['./element-temporal-datetime.component.scss'],
    imports: [
        CommonModule,
    ]
})
export class ElementTemporalDatetimeComponent {
  temporal = inject(TemporalServiceService);

  @Input() dateTime: string | Date = new Date().toString();
  @Input() format: dateTimeFormatKey = 'mediumDateTime';

  get date(): Date {
    return new Date(this.dateTime);
  }
}
