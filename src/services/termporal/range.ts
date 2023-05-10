import { LocaleSensitive } from './i18n';
import { dateTimeFormats } from './config';

export class Range implements LocaleSensitive {
  private formatters: { [key: string]: Intl.DateTimeFormat } = { };

  /* eslint-disable-next-line no-useless-constructor */ /* ESLint doesn't understand this constructor ISN'T useless in TypeScript */
  constructor(private locale = 'en-GB') { }

  public format(start: Date|string|number, end: Date|string|number, format: keyof typeof dateTimeFormats): string {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const key = `${this.locale}__${format}`;
    let formatter = this.formatters[key];
    if (!formatter) {
      formatter = new Intl.DateTimeFormat(this.locale, dateTimeFormats[format] as Intl.DateTimeFormatOptions);
      this.formatters[key] = formatter;
    }
    // TS doesn't know about formatRange, despite being standard and widely implemented
    // See also https://caniuse.com/mdn-javascript_builtins_intl_datetimeformat_formatrange
    // See also https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatRange
    return (formatter as any).formatRange(startDate, endDate);
  }

  public changeLocale(locale: string): void {
    if (locale !== this.locale) {
      this.locale = locale;
    }
  }
}

export const range = new Range();
