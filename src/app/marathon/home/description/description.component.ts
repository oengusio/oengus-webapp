import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Marathon } from 'src/model/marathon';
import { OengusMdComponent } from '../../../components/oengus-md/oengus-md.component';

@Component({
    selector: 'app-description',
    templateUrl: './description.component.html',
    styleUrls: ['./description.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        CommonModule,
        OengusMdComponent,
    ]
})
export class DescriptionComponent {
  // @ts-expect-error meh.
  @Input() marathon: Marathon;
}
