import { Component } from '@angular/core';
import { SavedCategory, SavedGame } from '../../../model/user-profile-history';
import { UserService } from '../../../services/user.service';
import { SelfUser } from '../../../model/user';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import gameConsoles from '../../../assets/consoles.json';
import { DurationService } from '../../../services/duration.service';

@Component({
  selector: 'app-saved-games-settings',
  templateUrl: './saved-games-settings.component.html',
  styleUrl: './saved-games-settings.component.scss',
  standalone: false,
})
export class SavedGamesSettingsComponent {
  readonly faPlus = faPlus;

  readonly user: SelfUser;
  readonly possibleConsoles: string[] = gameConsoles;


  games: Array<SavedGame> = [];

  isSupporter = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
  ) {
    this.user = this.route.snapshot.data.user;

    firstValueFrom(
      this.userService.getSupporterStatus(this.user.id)
    ).then((data) => {
      this.isSupporter = data.anySupporter;
    });

    firstValueFrom(
      this.userService.getSavedGamesList('@me')
    ).then((data) => {
      console.log(data);
      this.games = data.data;
    });
  }

  public addGame() {
    this.games.push({
      name: '',
      id: -1,
      emulated: false,
      console: '',
      description: '',
      ratio: '',
      categories: [],
    });

    this.addCategory(this.games.length - 1);
  }

  public addCategory(gameIndex: number) {
    this.games[gameIndex].categories.push({
      name: '',
      gameId: -1,
      estimate: '',
      id: -1,
      video: '',
      description: '',
    });
  }

  public removeGame(gameIndex: number) {
    const game = this.games[gameIndex];

    if (!confirm(`Are you sure that you want to delete "${game.name}"?`)) {
      return;
    }

    // TODO: call http delete if id > -1
    this.games.splice(gameIndex, 1);
  }

  public removeCategory(gameIndex: number, categoryIndex: number) {
    const game = this.games[gameIndex];
    const category = game.categories[categoryIndex];

    if (!confirm(`Are you sure that you want to delete "${game.name} - ${category.name}"?`)) {
      return;
    }

    // TODO: call http delete if id > -1
    this.games[gameIndex].categories.splice(categoryIndex, 1);
  }

  public getCategoryEstimate(category: SavedCategory) {
    return DurationService.toHuman(category.estimate);
  }

  public setCategoryEstimate(category: SavedCategory, newVal: string) {
    console.log('Updating estimate', newVal);

    category.estimate = DurationService.toIso(newVal);
  }

  public saveGame(game: SavedGame, gameIndex: number) {
    if (game.id < 1) {
      this.updateGame(game, gameIndex);
    }
  }

  public updateGame(game: SavedGame, gameIndex: number) {
    //
  }

  clickEmulatorButton(game: SavedGame, event: Event) {
    // event.preventDefault();
    // event.stopPropagation();
    // game.emulated = !game.emulated;
  }
}
