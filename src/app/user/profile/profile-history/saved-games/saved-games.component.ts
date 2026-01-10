import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SavedGame } from '../../../../../model/user-profile-history';
import { ElementTableComponent } from '../../../../elements/element-table/element-table.component';
import { ElementTableCellComponent } from '../../../../elements/element-table-cell/element-table-cell.component';
import { ElementTableRowComponent } from '../../../../elements/element-table-row/element-table-row.component';
import { ElementTemporalDurationComponent } from '../../../../elements/temporal/element-temporal-duration/element-temporal-duration.component';

@Component({
  selector: 'app-user-profile-saved-games',
  templateUrl: './saved-games.component.html',
  styleUrl: './saved-games.component.scss',
  imports: [
    CommonModule,
    TranslateModule,
    ElementTableComponent,
    ElementTableCellComponent,
    ElementTableRowComponent,
    ElementTemporalDurationComponent,
  ]
})
export class SavedGamesComponent {

  @Input() games: SavedGame[];

  getSpan(element: SavedGame): string {
    return `span ${element.categories.length}`;
  }

}
