import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {NwbCommonModule} from '@wizishop/ng-wizi-bulma';
import { ElementTableComponent } from './element-table/element-table.component';
import { ElementTableCellComponent } from './element-table-cell/element-table-cell.component';
import { ElementDropdownComponent } from './element-dropdown/element-dropdown.component';
import { ElementTemporalDatetimeComponent } from './temporal/element-temporal-datetime/element-temporal-datetime.component';

@NgModule({
  declarations: [
    ElementTableComponent,
    ElementTableCellComponent,
    ElementDropdownComponent,
    ElementTemporalDatetimeComponent,
  ],
  exports: [
    ElementTableComponent,
    ElementTableCellComponent,
    ElementDropdownComponent,
    ElementTemporalDatetimeComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NwbCommonModule
  ]
})
export class ElementModule {
}
