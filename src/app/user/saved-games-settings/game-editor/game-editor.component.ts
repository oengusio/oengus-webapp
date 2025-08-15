import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { SavedGame } from '../../../../model/user-profile-history';
import gameConsoles from '../../../../assets/consoles.json';
import { SavedGamesService } from '../../../../services/saved-games.service';
import { firstValueFrom } from 'rxjs';
import { faFloppyDisk, faPencil, faCancel } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-game-editor',
  standalone: false,
  templateUrl: './game-editor.component.html',
  styleUrl: './game-editor.component.scss'
})
export class GameEditorComponent implements OnInit {
  protected readonly possibleConsoles = gameConsoles;

  protected readonly editIcon = faPencil;
  protected readonly saveIcon = faFloppyDisk;
  protected readonly cancelIcon = faCancel;

  @Input('game') inputGame: SavedGame;
  @Input('index') i = 0;

  @Output() gameChange = new EventEmitter<SavedGame>();

  editing = false;
  loading = false;

  game: SavedGame;

  constructor(
    private savedGameService: SavedGamesService,
  ) {
  }

  ngOnInit() {
    this.game = {...this.inputGame};

    if (this.game.id < 1) {
      this.editing = true;
    }
  }

  protected cancelEdit() {
    this.game = {...this.inputGame};
    this.editing = false;
    this.loading = false;
  }

  public async saveGame() {
    if (this.game.id > 0) {
      await this.updateGame();
      return;
    }

    this.loading = true;

    try {
      const updatedGame = await firstValueFrom(
        this.savedGameService.create(this.game)
      );

      this.gameChange.emit(updatedGame);

      this.editing = false;
    } catch (e: unknown) {
      console.error(e);
    } finally {
      this.loading = false;
    }
  }

  protected async updateGame() {
    this.loading = true;

    try {
      const updatedGame = await firstValueFrom(
        this.savedGameService.update(this.game)
      );

      this.gameChange.emit(updatedGame);

      this.editing = false;
    } catch (e: unknown) {
      console.error(e);
    } finally {
      this.loading = false;
    }
  }
}
