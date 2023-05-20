import { Component } from '@angular/core';
import { LocaleService } from '../../../../services/locale.service';

@Component({
  selector: 'app-header-language-picker',
  templateUrl: './header-language-picker.component.html',
  styleUrls: ['./header-language-picker.component.scss']
})
export class HeaderLanguagePickerComponent {

  constructor(private localeService: LocaleService) { }

  get usableLocales(): string[] {
    return this.localeService.availableLocaleNames;
  }

  get languages() {
    return this.localeService.languagesJson;
  }

  get currentLocale() {
    return this.languages[this.localeService.language];
  }

  changeLanguage(locale: string): void {
    this.localeService.useLanguage(locale);
  }

}
