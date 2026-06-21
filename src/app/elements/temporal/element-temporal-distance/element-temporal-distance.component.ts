import { Component, Input, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemporalServiceService } from '../../../../services/termporal/temporal-service.service';

@Component({
    selector: 'app-element-temporal-distance',
    templateUrl: './element-temporal-distance.component.html',
    styleUrls: ['./element-temporal-distance.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        CommonModule,
    ]
})
export class ElementTemporalDistanceComponent {
  temporal = inject(TemporalServiceService);

  // @ts-expect-error meh.
  @Input() dateTime: string | Temporal.ZonedDateTime;
}
