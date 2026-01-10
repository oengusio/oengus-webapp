import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule } from '@oengusio/ngx-translate-router';
import { getRowParity } from '../../../../../assets/table';
import { HistoryMarathon } from '../../../../../model/user-profile-history';
import { ElementTableComponent } from '../../../../elements/element-table/element-table.component';
import { ElementTableCellComponent } from '../../../../elements/element-table-cell/element-table-cell.component';
import { ElementTableRowComponent } from '../../../../elements/element-table-row/element-table-row.component';
import { ElementTemporalDatetimeComponent } from '../../../../elements/temporal/element-temporal-datetime/element-temporal-datetime.component';
import { ElementTemporalDistanceComponent } from '../../../../elements/temporal/element-temporal-distance/element-temporal-distance.component';

@Component({
    selector: 'app-user-profile-moderated-history',
    templateUrl: './moderated.component.html',
    styleUrls: ['./moderated.component.scss'],
    imports: [
        CommonModule,
        RouterModule,
        TranslateModule,
        LocalizeRouterModule,
        ElementTableComponent,
        ElementTableCellComponent,
        ElementTableRowComponent,
        ElementTemporalDatetimeComponent,
        ElementTemporalDistanceComponent,
    ]
})
export class ModeratedComponent {
  @Input() history: HistoryMarathon[];

  getRowParity = getRowParity;

  get moderatedMarathons() {
    return [ ...this.history ].reverse();
  }

}
