import { LocaleSensitive } from './i18n';
import { dateTimeFormatKey, dateTimeFormats } from './config';

export class Formatting implements LocaleSensitive {
  constructor(private locale = 'en-GB') {
  }

  format(date: Temporal.ZonedDateTime, format: dateTimeFormatKey): string {
    const options = dateTimeFormats[format];
    const dateTimeFormat = new Intl.DateTimeFormat(this.locale, options);

    return dateTimeFormat.format(date.epochMilliseconds);
  }

  changeLocale(locale: string): void {
    if (locale !== this.locale) {
      this.locale = locale;
    }
  }

}

export const formatting = new Formatting();
