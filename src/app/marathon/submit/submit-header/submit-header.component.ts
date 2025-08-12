import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MarathonService } from '../../../../services/marathon.service';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-submit-header',
  templateUrl: './submit-header.component.html',
  styleUrl: './submit-header.component.scss',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubmitHeaderComponent {
  faCheck = faCheck;
  faTimes = faTimes;

  constructor(private marathonService: MarathonService) {
  }

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
