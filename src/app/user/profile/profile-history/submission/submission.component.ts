import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HistoryGame, HistoryGameCategory, UserProfileHistory } from '../../../../../model/user-profile-history';
import { RunStatus } from '../../../../../model/category';
import { ElementTableComponent } from '../../../../elements/element-table/element-table.component';
import { ElementTableCellComponent } from '../../../../elements/element-table-cell/element-table-cell.component';
import { ElementTableRowComponent } from '../../../../elements/element-table-row/element-table-row.component';
import { ElementTemporalDurationComponent } from '../../../../elements/temporal/element-temporal-duration/element-temporal-duration.component';

@Component({
    selector: 'app-user-profile-submission-history',
    templateUrl: './submission.component.html',
    styleUrls: ['./submission.component.scss'],
    imports: [
        CommonModule,
        TranslateModule,
        ElementTableComponent,
        ElementTableCellComponent,
        ElementTableRowComponent,
        ElementTemporalDurationComponent,
    ]
})
export class SubmissionComponent {
  @Input() submissions: UserProfileHistory[];

  getSpan(element: UserProfileHistory|HistoryGame|HistoryGameCategory): string {
    return `span ${this.getCategories(element).length}`;
  }

  getCellColor(element: UserProfileHistory|HistoryGame|HistoryGameCategory) {
    const status = this.getCategories(element)
      .reduce((currentStatus, category) => Math.min(currentStatus, RunStatus[category.status]), Infinity);

    return {
      'is-info': status === RunStatus.VALIDATED,
      'is-primary': status === RunStatus.BONUS,
      'is-success': status === RunStatus.BACKUP,
      'is-warning': status === RunStatus.REJECTED,
    };
  }

  getCategories(element: UserProfileHistory|HistoryGame|HistoryGameCategory): HistoryGameCategory[] {
    return this.isCategory(element)
      ? [ element ]
      : (
        this.isGame(element)
          ? element.categories
          : element.games.reduce((categories, game) => [ ...categories, ...game.categories ], [ ] as HistoryGameCategory[])
      );
  }
  isMarathon(element: UserProfileHistory|HistoryGame|HistoryGameCategory): element is UserProfileHistory {
    return Object.prototype.hasOwnProperty.call(element, 'games');
  }
  isGame(element: UserProfileHistory|HistoryGame|HistoryGameCategory): element is HistoryGame {
    return Object.prototype.hasOwnProperty.call(element, 'categories');
  }
  isCategory(element: UserProfileHistory|HistoryGame|HistoryGameCategory): element is HistoryGameCategory {
    return Object.prototype.hasOwnProperty.call(element, 'status');
  }

}
