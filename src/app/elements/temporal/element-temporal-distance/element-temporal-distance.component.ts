import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemporalServiceService } from '../../../../services/termporal/temporal-service.service';

@Component({
    selector: 'app-element-temporal-distance',
    templateUrl: './element-temporal-distance.component.html',
    styleUrls: ['./element-temporal-distance.component.scss'],
    imports: [
        CommonModule,
    ]
})
export class ElementTemporalDistanceComponent {
  temporal = inject(TemporalServiceService);

  @Input() dateTime: string | Date;
}
