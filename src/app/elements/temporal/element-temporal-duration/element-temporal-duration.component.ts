import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemporalServiceService } from '../../../../services/termporal/temporal-service.service';

@Component({
    selector: 'app-element-temporal-duration',
    templateUrl: './element-temporal-duration.component.html',
    styleUrls: ['./element-temporal-duration.component.scss'],
    imports: [
        CommonModule,
    ]
})
export class ElementTemporalDurationComponent {
  temporal = inject(TemporalServiceService);

  @Input() duration = 'PT0S';

}
