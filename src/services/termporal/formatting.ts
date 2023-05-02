import { LocaleSensitive } from './i18n';

export class Formatting implements LocaleSensitive {
  private dateTimeFormat: Intl.DateTimeFormat;
  private formatters = {
    'mediumDateTime': { dateStyle: 'medium', timeStyle: 'medium', },
    'longDate': { dateStyle: 'long', },
  };

  constructor(private locale = 'en-GB') {
    this.dateTimeFormat = new Intl.DateTimeFormat(this.locale);
  }

  format(date: Date, format: string): string {
    const options = this.formatters[format];
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
