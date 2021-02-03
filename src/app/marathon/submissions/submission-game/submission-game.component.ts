import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Game} from '../../../../model/game';
import {Marathon} from '../../../../model/marathon';
import {Category} from '../../../../model/category';

@Component({
  selector: 'app-submission-game',
  templateUrl: './submission-game.component.html',
  styleUrls: ['./submission-game.component.scss']
})
export class SubmissionGameComponent implements OnInit, OnDestroy {

  @Input() public game: Game;
  @Input() public marathon: Marathon;
  @Input() public showDelete: boolean;
  @Input() public userIsAdmin: boolean;
  @Input() private selection: Map<number, Selection>;

  @Output() public deleteGame: EventEmitter<void> = new EventEmitter();
  @Output() public deleteCategory: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.deleteGame.unsubscribe();
    this.deleteCategory.unsubscribe();
  }

  getRawStatus(category: Category): string {
    if (!this.marathon.selectionDone || !this.selection[category.id]) {
      return '';
    }

    return this.selection[category.id].status;
  }

  get gameStatus(): string {
    if (!this.marathon.selectionDone) {
      return '';
    }

    let status = 'REJECTED';
    this.game.categories.filter(c => c.visible).forEach(category => {
      if (this.selection[category.id]) {
        switch (this.selection[category.id].status) {
          case 'VALIDATED':
            status = 'VALIDATED';
            break;
          case 'BONUS':
            if (status !== 'VALIDATED') {
              status = 'BONUS';
            }
            break;
          case 'BACKUP':
            if (status !== 'VALIDATED' && status !== 'BONUS') {
              status = 'BACKUP';
            }
            break;
          default:
            break;
        }
      }
    });

    return status.toLowerCase();
  }
}
