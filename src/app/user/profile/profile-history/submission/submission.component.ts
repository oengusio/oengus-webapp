import { Component, Input } from '@angular/core';
import { HistoryGame, HistoryGameCategory, UserProfileHistory } from '../../../../../model/user-profile-history';
import { RunStatus } from '../../../../../model/category';

@Component({
  selector: 'app-user-profile-submission-history',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.scss']
})
export class SubmissionComponent {
  @Input() submissions: UserProfileHistory[];

  constructor() { }

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

  getCategories(element: UserProfileHistory|HistoryGame|HistoryGameCategory): Array<HistoryGameCategory> {
    return this.isCategory(element)
      ? [ element ]
      : (
        this.isGame(element)
          ? element.categories
          : element.games.reduce((categories, game) => [ ...categories, ...game.categories ], [ ] as Array<HistoryGameCategory>)
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
