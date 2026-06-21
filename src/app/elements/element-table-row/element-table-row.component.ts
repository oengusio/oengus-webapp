import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-element-table-row',
    templateUrl: './element-table-row.component.html',
    styleUrls: ['./element-table-row.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        CommonModule,
    ]
})
export class ElementTableRowComponent {
  //
}
