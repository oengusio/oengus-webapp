import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocaleService } from '../../../../services/locale.service';
import { ElementModule } from '../../../elements/elements.module';

@Component({
    selector: 'app-header-language-picker',
    templateUrl: './header-language-picker.component.html',
    styleUrls: ['./header-language-picker.component.scss'],
    imports: [
        CommonModule,
        ElementModule,
    ]
})
export class HeaderLanguagePickerComponent {
  private localeService = inject(LocaleService);


  get usableLocales(): string[] {
    return this.localeService.availableLocaleNames;
  }

  get languages() {
    return this.localeService.languagesJson;
  }

  get currentLocale() {
    return this.languages[this.localeService.language];
  }

  changeLanguage(locale: string): boolean {
    this.localeService.useLanguage(locale);
    return false;
  }

}
