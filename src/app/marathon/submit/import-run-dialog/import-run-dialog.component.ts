import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SavedCategory, SavedGame } from '../../../../model/user-profile-history';
import { DurationService } from '../../../../services/duration.service';
import { ElementI18nComponent } from '../../../elements/element-i18n/element-i18n.component';

@Component({
  selector: 'app-import-run-dialog',
  standalone: true,
  templateUrl: './import-run-dialog.component.html',
  styleUrl: './import-run-dialog.component.scss',
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    ElementI18nComponent,
  ],
})
export class ImportRunDialogComponent {

  @Input() modalActive: boolean;
  @Input() savedGames: SavedGame[];

  @Output() doImport = new EventEmitter<SavedCategory[]>();
  // eslint-disable-next-line @angular-eslint/no-output-native
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
