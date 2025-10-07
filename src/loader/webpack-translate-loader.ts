import { TranslateLoader } from '@ngx-translate/core';
import { from, Observable } from 'rxjs';

export class WebpackTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<unknown> {
    if (lang === 'en-GB') {
      return from(import(`../assets/i18n/en.json`));
    }

    return from(import(`../assets/i18n/${lang}.json`));
  }
}
