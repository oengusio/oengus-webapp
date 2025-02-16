import { Component, Input } from '@angular/core';
import { TemporalServiceService } from '../../../../services/termporal/temporal-service.service';
import { dateTimeFormatKey } from '../../../../services/termporal/config';

@Component({
    selector: 'app-element-temporal-range',
    templateUrl: './element-temporal-range.component.html',
    styleUrls: ['./element-temporal-range.component.scss'],
    standalone: false
})
export class ElementTemporalRangeComponent {
  @Input() start: string | Date;
  @Input() end: string | Date;
  @Input() format: dateTimeFormatKey = 'mediumDateTime';

  constructor(public temporal: TemporalServiceService) { }
}
