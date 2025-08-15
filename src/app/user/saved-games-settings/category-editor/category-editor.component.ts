import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { faCancel, faFloppyDisk, faPencil } from '@fortawesome/free-solid-svg-icons';
import { SavedCategory } from '../../../../model/user-profile-history';
import { firstValueFrom } from 'rxjs';
import { SavedGamesService } from '../../../../services/saved-games.service';
import { DurationService } from '../../../../services/duration.service';

@Component({
  selector: 'app-category-editor',
  standalone: false,
  templateUrl: './category-editor.component.html',
  styleUrl: './category-editor.component.scss'
})
export class CategoryEditorComponent implements OnInit, OnChanges {
  protected readonly editIcon = faPencil;
  protected readonly saveIcon = faFloppyDisk;
  protected readonly cancelIcon = faCancel;

  @Input() gameId: number;
  @Input('category') inputCategory: SavedCategory;
  @Input('gameIndex') i = 0;
  @Input('index') j = 0;

  @Output() categoryChange = new EventEmitter<SavedCategory>();
  @Output() saveGameInstead = new EventEmitter<void>();

  editing = false;
  loading = false;

  protected category: SavedCategory;

  constructor(
    private savedGameService: SavedGamesService,
  ) {
  }

  ngOnInit() {
    this.category = { ...this.inputCategory };

    if (this.category.id < 1) {
      this.editing = true;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.gameId && changes.gameId.currentValue !== changes.gameId.previousValue) {
      this.editing = false;
      this.loading = false;
    }
  }

  protected cancelEdit() {
    this.category = { ...this.inputCategory };
    this.loading = false;
    this.editing = false;
  }

  protected async saveCategory() {
    if (this.gameId < 0) {
      this.triggerUpdateAndSaveGame();
      return;
    }

    if (this.category.id > 0) {
      await this.updateCategory();
      return;
    }

    try {
      const updatedCategory = await firstValueFrom(
        this.savedGameService.createCategory(this.gameId, this.category)
      );

      this.categoryChange.emit(updatedCategory);

      this.editing = false;
    } catch (e: unknown) {
      console.error(e);
    } finally {
      this.loading = false;
    }
  }

  private async updateCategory() {
    this.loading = true;

    try {
      const updatedCategory = await firstValueFrom(
        this.savedGameService.updateCategory(this.gameId, this.category)
      );

      this.categoryChange.emit(updatedCategory);

      this.editing = false;
    } catch (e: unknown) {
      console.error(e);
    } finally {
      this.loading = false;
    }
  }

  public triggerUpdateAndSaveGame() {
    this.loading = true;
    this.categoryChange.emit(this.category);
    window.requestAnimationFrame(() => {
      this.saveGameInstead.emit();
    });
  }

  get parsedEstimate(): string {
    return DurationService.toHuman(this.category.estimate);
  }

  set parsedEstimate(value: string) {
    console.log('Updating estimate', value);

    this.category.estimate = DurationService.toIso(value);
  }
}
