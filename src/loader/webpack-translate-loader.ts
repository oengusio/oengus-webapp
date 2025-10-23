import { TranslateLoader, TranslationObject } from '@ngx-translate/core';
import { from, Observable } from 'rxjs';

export class WebpackTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<TranslationObject> {
    if (lang === 'en-GB') {
      return from(import(`../assets/i18n/en.json`));
    }

    return from(import(`../assets/i18n/${lang}.json`));
  }
}
