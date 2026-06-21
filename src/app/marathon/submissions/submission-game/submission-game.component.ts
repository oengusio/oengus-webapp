import { Component, EventEmitter, Input, OnDestroy, Output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Game } from '../../../../model/game';
import { Marathon } from '../../../../model/marathon';
import { Category } from '../../../../model/category';
import { OengusCommonModule } from '../../../oengus-common/oengus-common.module';
import { SimpleMdComponent } from '../../../components/simple-md/simple-md.component';
import { SubmissionCategoryComponent } from '../submission-category/submission-category.component';

@Component({
    selector: 'app-submission-game',
    templateUrl: './submission-game.component.html',
    styleUrls: ['./submission-game.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        CommonModule,
        TranslateModule,
        OengusCommonModule,
        SimpleMdComponent,
        SubmissionCategoryComponent,
    ]
})
export class SubmissionGameComponent implements OnDestroy {

  // @ts-expect-error meh.
  @Input() public game: Game;
  // @ts-expect-error meh.
  @Input() public marathon: Marathon;
  // @ts-expect-error meh.
  @Input() public showDelete: boolean;
  // @ts-expect-error meh.
  @Input() public userIsAdmin: boolean;
  // @ts-expect-error meh.
  @Input() public selection: Map<number, Selection>;

  @Output() public deleteGame = new EventEmitter<void>();
  @Output() public deleteCategory = new EventEmitter<number>();

  ngOnDestroy() {
    this.deleteGame.unsubscribe();
    this.deleteCategory.unsubscribe();
  }

  getRawStatus(category: Category): string {
    // @ts-expect-error meh.
    if (!this.marathon.selectionDone || !this.selection[category.id]) {
      return '';
    }

    // @ts-expect-error meh.
    return this.selection[category.id]?.status ?? 'TODO';
  }

  get gameStatus(): string {
    if (!this.marathon.selectionDone) {
      return '';
    }

    let status = 'REJECTED';
    this.game.categories.forEach(category => {
      // @ts-expect-error meh.
      if (this.selection[category.id]) {
        // @ts-expect-error meh.
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
