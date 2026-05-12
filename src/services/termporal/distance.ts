import { LocaleSensitive } from './i18n';

export class Distance implements LocaleSensitive {
  private relativeTimeFormat: Intl.RelativeTimeFormat;

  constructor(private locale = 'en-GB') {
    this.relativeTimeFormat = new Intl.RelativeTimeFormat(this.locale);
  }

  // TODO: extract into reusable function
  private getInstant(date: Temporal.ZonedDateTime | string | number): Temporal.Instant {
    if (date instanceof  Temporal.ZonedDateTime) {
      return date.toInstant();
    }

    if (typeof date === 'number') {
      return Temporal.Instant.fromEpochMilliseconds(date);
    }

    return Temporal.Instant.from(date);
  }

  public format(datetime: Temporal.ZonedDateTime | string | number): string {
    const targetInstant = this.getInstant(datetime);
    const nowInstant = Temporal.Now.instant();

    const diffDur = nowInstant.until(targetInstant);

    // seconds
    let diff = diffDur.total('seconds');
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
          } else if (Math.abs(diff) > 25) {
            diff /= 30;
            unit = 'month'; // Eh, 30 days is close enough
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
