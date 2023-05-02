import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {NwbCommonModule} from '@wizishop/ng-wizi-bulma';
import { ElementTableComponent } from './element-table/element-table.component';
import { ElementTableCellComponent } from './element-table-cell/element-table-cell.component';
import { ElementDropdownComponent } from './element-dropdown/element-dropdown.component';
import { ElementTemporalDatetimeComponent } from './temporal/element-temporal-datetime/element-temporal-datetime.component';
import { ElementTableRowComponent } from './element-table-row/element-table-row.component';
import { ElementTemporalDurationComponent } from './temporal/element-temporal-duration/element-temporal-duration.component';
import { ElementTableExpandButtonComponent } from './element-table-expand-button/element-table-expand-button.component';
import { ElementTableDetailComponent } from './element-table-detail/element-table-detail.component';
import { ElementTemporalDistanceComponent } from './temporal/element-temporal-distance/element-temporal-distance.component';
import { ElementConsoleComponent } from './element-console/element-console.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../services/http-loader-factory';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    ElementTableComponent,
    ElementTableCellComponent,
    ElementDropdownComponent,
    ElementTemporalDatetimeComponent,
    ElementTableRowComponent,
    ElementTemporalDurationComponent,
    ElementTableExpandButtonComponent,
    ElementTableDetailComponent,
    ElementTemporalDistanceComponent,
    ElementConsoleComponent,
  ],
  exports: [
    ElementTableComponent,
    ElementTableCellComponent,
    ElementDropdownComponent,
    ElementTemporalDatetimeComponent,
    ElementTableRowComponent,
    ElementTemporalDurationComponent,
    ElementTableExpandButtonComponent,
    ElementTableDetailComponent,
    ElementTemporalDistanceComponent,
    ElementConsoleComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NwbCommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ]
})
export class ElementModule {
}
