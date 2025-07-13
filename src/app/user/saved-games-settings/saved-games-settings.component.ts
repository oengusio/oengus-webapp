import { Component } from '@angular/core';
import { SavedGame } from '../../../model/user-profile-history';

@Component({
  selector: 'app-saved-games-settings',
  templateUrl: './saved-games-settings.component.html',
  styleUrl: './saved-games-settings.component.scss',
  standalone: false,
})
export class SavedGamesSettingsComponent {
  games: Array<SavedGame> = [];
}
