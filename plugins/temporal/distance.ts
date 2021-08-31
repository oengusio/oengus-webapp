export class Distance {
  private relativeTimeFormat: Intl.RelativeTimeFormat;

  /* eslint-disable-next-line no-useless-constructor */ /* ESLint doesn't understand this constructor ISN'T useless in TypeScript */
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
}

export const distance = new Distance();
