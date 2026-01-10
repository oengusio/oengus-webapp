import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MarathonService } from '../../../../services/marathon.service';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ElementTemporalDatetimeComponent } from '../../../elements/temporal/element-temporal-datetime/element-temporal-datetime.component';

@Component({
  selector: 'app-submit-header',
  templateUrl: './submit-header.component.html',
  styleUrl: './submit-header.component.scss',
  imports: [
    CommonModule,
    TranslateModule,
    FontAwesomeModule,
    ElementTemporalDatetimeComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubmitHeaderComponent {
  private marathonService = inject(MarathonService);

  faCheck = faCheck;
  faTimes = faTimes;

  get startDate() {
    return this.marathonService.marathon.startDate;
  }

  get endDate() {
    return this.marathonService.marathon.endDate;
  }

  get unlimitedGames() {
    return this.marathonService.marathon.unlimitedGames;
  }

  get maxGamesPerRunner() {
    return this.marathonService.marathon.maxGamesPerRunner;
  }

  get unlimitedCategories() {
    return this.marathonService.marathon.unlimitedCategories;
  }

  get maxCategoriesPerGame() {
    return this.marathonService.marathon.maxCategoriesPerGame;
  }

  get hasMultiplayer() {
    return this.marathonService.marathon.hasMultiplayer;
  }

  get maxNumberOfScreens() {
    return this.marathonService.marathon.maxNumberOfScreens;
  }
}
