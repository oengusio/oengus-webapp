import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-clone-popup',
  standalone: true,
  imports: [
    FontAwesomeModule,
    TranslateModule,
    NgIf,
  ],
  templateUrl: './clone-popup.component.html',
  styleUrl: './clone-popup.component.scss'
})
export class ClonePopupComponent {
  shown = false;
  loading = false;
  open = false;

  openClonePopup(): void {
    // 1. set dialog to open
    this.open = true;
    this.loading = true;

    // 2. load all schedules in the dropdown
    // 3. remove own schedule
    // 4. show error if no other schedules
    // 5. disable loading.
  }

}
