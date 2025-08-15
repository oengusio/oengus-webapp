import { Component, OnInit } from '@angular/core';
import { SavedGame } from '../../../model/user-profile-history';
import { UserService } from '../../../services/user.service';
import { SelfUser } from '../../../model/user';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { SavedGamesService } from '../../../services/saved-games.service';

@Component({
  selector: 'app-saved-games-settings',
  templateUrl: './saved-games-settings.component.html',
  styleUrl: './saved-games-settings.component.scss',
  standalone: false,
})
export class SavedGamesSettingsComponent implements OnInit {
  protected readonly faPlus = faPlus;
  protected readonly user: SelfUser;
  protected readonly maxCategories = 20;

  games: Array<SavedGame> = [];

  isSupporter = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private savedGameService: SavedGamesService,
  ) {
    this.user = this.route.snapshot.data.user;
  }

  ngOnInit(): void {
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

    this.addCategory(this.games.length - 1, false);

    window.requestAnimationFrame(() => {
      const tags = Array.from(document.getElementsByTagName('app-game-editor'));

      tags[tags.length - 1].scrollIntoView({
        behavior: 'smooth',
      });
    });
  }

  public addCategory(gameIndex: number, scrollIntoView = true) {
    this.games[gameIndex].categories.push({
      name: '',
      gameId: -1,
      estimate: '',
      id: -1,
      video: '',
      description: '',
    });

    if (scrollIntoView) {
      window.requestAnimationFrame(() => {
        const categories = Array.from(document.querySelectorAll(`[data-gi="${gameIndex}"] app-category-editor`));

        categories[categories.length - 1].scrollIntoView({
          behavior: 'smooth',
        });
      });
    }
  }

  public removeGame(gameIndex: number) {
    const game = this.games[gameIndex];

    if (!confirm(`Are you sure that you want to delete "${game.name}"?`)) {
      return;
    }

    const rmGame = () => this.games.splice(gameIndex, 1);

    if (game.id > 0) {
      this.savedGameService.delete(game.id).subscribe({
        next(status) {
          if (status.status) {
            rmGame();
          }
        },

        error(e) {
          console.error(e);
        },
      });
    } else {
      rmGame();
    }
  }

  protected removeCategory(gameIndex: number, categoryIndex: number) {
    const game = this.games[gameIndex];
    const category = game.categories[categoryIndex];

    if (!confirm(`Are you sure that you want to delete "${game.name} - ${category.name}"?`)) {
      return;
    }

    const rmCategory = () => this.games[gameIndex].categories.splice(categoryIndex, 1);

    if (category.id > 0) {
      this.savedGameService.deleteCategory(game.id, category.id).subscribe({
        next(status) {
          if (status.status) {
            rmCategory();
          }
        },

        error(e) {
          console.error(e);
        },
      });
    } else {
      rmCategory();
    }
  }
}
