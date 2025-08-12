import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SavedCategory, SavedGame } from '../../../../model/user-profile-history';
import { DurationService } from '../../../../services/duration.service';

@Component({
  selector: 'app-import-run-dialog',
  standalone: false,
  templateUrl: './import-run-dialog.component.html',
  styleUrl: './import-run-dialog.component.scss',
})
export class ImportRunDialogComponent {

  @Input() modalActive: boolean;
  @Input() savedGames: SavedGame[];

  @Output() doImport = new EventEmitter<SavedCategory[]>();
  @Output() cancel = new EventEmitter<void>();

  selectedCategories: SavedCategory[] = [];

  private cache: Record<string, string> = {};

  protected durationToHuman(input: string) {
    if (!(input in this.cache)) {
      this.cache[input] = DurationService.toHuman(input);
    }

    return this.cache[input];
  }

}
