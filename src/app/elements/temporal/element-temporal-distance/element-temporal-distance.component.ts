import { Component, Input } from '@angular/core';
import { TemporalServiceService } from '../../../../services/termporal/temporal-service.service';

@Component({
    selector: 'app-element-temporal-distance',
    templateUrl: './element-temporal-distance.component.html',
    styleUrls: ['./element-temporal-distance.component.scss'],
    standalone: false
})
export class ElementTemporalDistanceComponent {
  @Input() dateTime: string | Date;

  constructor(public temporal: TemporalServiceService) {
    //
  }
}
