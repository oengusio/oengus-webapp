import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NwbAlertConfig } from '@wizishop/ng-wizi-bulma';
import { CategoryService } from '../../../../services/category.service';
import { MarathonService } from '../../../../services/marathon.service';
import { NotificationService } from '../../../../services/notification.service';
import { firstValueFrom } from 'rxjs';
import { Opponent } from '../../../../model/opponent';

@Component({
  selector: 'app-submit-multiplayer-join',
  templateUrl: './submit-multiplayer-join.component.html',
  styleUrl: './submit-multiplayer-join.component.scss',
  standalone: false,
})
export class SubmitMultiplayerJoinComponent {

  code = '';

  @Input() opponents: Opponent[];

  @Output() private addOpponent = new EventEmitter<Opponent>();
  @Output() private removeOpponent = new EventEmitter<number>();

  constructor(
    private categoryService: CategoryService,
    public marathonService: MarathonService,
    private notifyService: NotificationService,
  ) {
  }

  async getMultiplayerSubmission() {
    try {
      const opponent = await firstValueFrom(
        this.categoryService.getFromCode(this.marathonService.marathon.id, this.code)
      );

      this.addOpponent.emit(opponent);
    } catch (error: any) {
      this.notifyService.toast('alert.submit.' + error.error, 3000, 'warning');
    }
  }

  removeMultiplayer(index: number) {
    // this.submission.opponents.splice(index, 1);
    this.removeOpponent.emit(index);
  }
}
