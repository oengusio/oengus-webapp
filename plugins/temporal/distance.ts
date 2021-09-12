import { LocaleSensitive } from './i18n';

export class Distance implements LocaleSensitive {
  private relativeTimeFormat: Intl.RelativeTimeFormat;

  constructor(public locale = 'en-GB') {
    this.relativeTimeFormat = new Intl.RelativeTimeFormat(this.locale);
  }

  public format(datetime: Date|string|number): string {
    const date = new Date(datetime).getTime();
    // seconds
    let diff = (date - Date.now()) / 1000;
    let unit: Intl.RelativeTimeFormatUnit = 'second';
    if (Math.abs(diff) > 89) {
      diff /= 60;
      unit = 'minute';
      if (Math.abs(diff) > 89) {
        diff /= 60;
        unit = 'hour';
        if (Math.abs(diff) > 21) {
          diff /= 24;
          unit = 'day';
          if (Math.abs(diff) > 319) {
            diff /= 365;
            unit = 'year'; // (ignoring leap years)
          }
        }
      }
    }
    return this.relativeTimeFormat.format(Math.round(diff), unit);
  }

  public changeLocale(locale: string): void {
    if (locale !== this.locale) {
      this.locale = locale;
      this.relativeTimeFormat = new Intl.RelativeTimeFormat(this.locale);
    }
  }
}

export const distance = new Distance();
