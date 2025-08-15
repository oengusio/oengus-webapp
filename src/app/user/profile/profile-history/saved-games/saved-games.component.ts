import { Component, Input } from '@angular/core';
import { SavedGame } from '../../../../../model/user-profile-history';

@Component({
  selector: 'app-user-profile-saved-games',
  templateUrl: './saved-games.component.html',
  styleUrl: './saved-games.component.scss',
  standalone: false,
})
export class SavedGamesComponent {

  @Input() games: Array<SavedGame>;

  getSpan(element: SavedGame): string {
    return `span ${element.categories.length}`;
  }

}
