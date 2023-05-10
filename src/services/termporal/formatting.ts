import { LocaleSensitive } from './i18n';
import { dateTimeFormats } from './config';

export class Formatting implements LocaleSensitive {
  private dateTimeFormat: Intl.DateTimeFormat;

  constructor(private locale = 'en-GB') {
    this.dateTimeFormat = new Intl.DateTimeFormat(this.locale);
  }

  format(date: Date, format: string): string {
    const options = dateTimeFormats[format];
    // @ts-ignore
    const dateTimeFormat = new Intl.DateTimeFormat(this.locale, options);

    return dateTimeFormat.format(date);
  }

  changeLocale(locale: string): void {
    if (locale !== this.locale) {
      this.locale = locale;
      this.dateTimeFormat = new Intl.DateTimeFormat(this.locale);
    }
  }

}
export const formatting = new Formatting();
