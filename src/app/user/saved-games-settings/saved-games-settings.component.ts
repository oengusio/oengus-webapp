import { Component } from '@angular/core';
import { SavedGame } from '../../../model/user-profile-history';
import { UserService } from '../../../services/user.service';
import { SelfUser } from '../../../model/user';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import gameConsoles from '../../../assets/consoles.json';

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
    //
  }

  public removeGame(gameIndex: number) {
    //
  }

  clickEmulatorButton(game: SavedGame, event: Event) {
    // event.preventDefault();
    // event.stopPropagation();
    // game.emulated = !game.emulated;
  }
}
