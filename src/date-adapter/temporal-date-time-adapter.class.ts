/**
 * temporal-date-time-adapter.class
 */

import { Inject, Injectable, Optional } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import {
  DateTimeAdapter,
  OWL_DATE_TIME_LOCALE,
} from '@oengus/angular-datetime-picker';
import { range } from './array.utils';

/**
 * Matches strings that have the form of a valid RFC 3339 string
 * (https://tools.ietf.org/html/rfc3339). Note that the string may not actually be a valid date
 * because the regex will match strings an with out of bounds month, date, etc.
 */
const ISO_8601_REGEX = /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|(?:[+\-]\d{2}:\d{2}))?)?$/;

@Injectable()
export class TemporalDateTimeAdapter extends DateTimeAdapter<Temporal.ZonedDateTime> {
  public firstMonthOfTheYear = 1;
  public firstDayOfTheWeek = -2; // WHY THE FUCK. No I don't know why this is -2. But it seems correct

  private readonly nanoSecondsInMinute = 60000000000;

  /** Whether to clamp the date between 1 and 9999 to avoid IE and Edge errors. */
  private readonly _clampDate: boolean;

  /**
   * Whether to use `timeZone: 'utc'` with `Intl.DateTimeFormat` when formatting dates.
   * Without this `Intl.DateTimeFormat` sometimes chooses the wrong timeZone, which can throw off
   * the result. (e.g. in the en-US locale `new Date(1800, 7, 14).toLocaleDateString()`
   * will produce `'8/13/1800'`.
   */
  useUtcForDisplay: boolean;

  constructor(
    @Optional()
    @Inject(OWL_DATE_TIME_LOCALE)
    private owlDateTimeLocale: string,
    platform: Platform
  ) {
    super();
    super.setLocale(owlDateTimeLocale);

    // IE does its own time zone correction, so we disable this on IE.
    this.useUtcForDisplay = !platform.TRIDENT;
    this._clampDate = platform.TRIDENT || platform.EDGE;
  }

  public getYear(date: Temporal.ZonedDateTime): number {
    return date.year;
  }

  public getMonth(date: Temporal.ZonedDateTime): number {
    return date.month;
  }

  public getDay(date: Temporal.ZonedDateTime): number {
    return date.dayOfWeek;
  }

  public getDate(date: Temporal.ZonedDateTime): number {
    return date.day;
  }

  public getHours(date: Temporal.ZonedDateTime): number {
    return date.hour;
  }

  public getMinutes(date: Temporal.ZonedDateTime): number {
    return date.minute;
  }

  public getSeconds(date: Temporal.ZonedDateTime): number {
    return date.second;
  }

  public getTime(date: Temporal.ZonedDateTime): number {
    return date.epochMilliseconds;
  }

  public getNumDaysInMonth(date: Temporal.ZonedDateTime): number {
    return date.daysInMonth;
  }

  public differenceInCalendarDays(dateLeft: Temporal.ZonedDateTime, dateRight: Temporal.ZonedDateTime): number {
    if (this.isValid(dateLeft) && this.isValid(dateRight)) {
      const dateLeftStartOfDay = this.createDate(
        this.getYear(dateLeft),
        this.getMonth(dateLeft),
        this.getDate(dateLeft)
      );
      const dateRightStartOfDay = this.createDate(
        this.getYear(dateRight),
        this.getMonth(dateRight),
        this.getDate(dateRight)
      );

      // TODO: convert nanoseconds to milliseconds
      const timeStampLeft =
        this.getTime(dateLeftStartOfDay) -
        (dateLeftStartOfDay.offsetNanoseconds / this.nanoSecondsInMinute) *
        this.milliseondsInMinute;
      const timeStampRight =
        this.getTime(dateRightStartOfDay) -
        (dateRightStartOfDay.offsetNanoseconds / this.nanoSecondsInMinute) *
        this.milliseondsInMinute;
      return Math.round(
        (timeStampLeft - timeStampRight) / this.millisecondsInDay
      );
    } else {
      return null;
    }
  }

  public getYearName(date: Temporal.ZonedDateTime): string {
    const dtf = new Intl.DateTimeFormat(this.getLocale(), {
      year: 'numeric',
      timeZone: 'utc'
    });

    return this.stripDirectionalityCharacters(this._format(dtf, date));
  }

  public getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    const dtf = new Intl.DateTimeFormat(this.getLocale(), {
      month: style,
      timeZone: 'utc'
    });
    return range(12, i =>
      this.stripDirectionalityCharacters(
        this._format(dtf, Temporal.Now.zonedDateTimeISO(this.timezone).with({ month: i + 1 }))
      )
    );
  }

  public getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    const dtf = new Intl.DateTimeFormat(this.getLocale(), {
      weekday: style,
      timeZone: 'utc'
    });

    return range(7, i =>
      this.stripDirectionalityCharacters(
        this._format(dtf, Temporal.Now.zonedDateTimeISO(this.timezone).with({ day: i + 1 }))
      )
    );
  }

  public getDateNames(): string[] {
    const dtf = new Intl.DateTimeFormat(this.getLocale(), {
      day: 'numeric',
      timeZone: 'utc'
    });

    return range(31, i =>
      this.stripDirectionalityCharacters(
        this._format(dtf, Temporal.Now.zonedDateTimeISO(this.timezone).with({ day: i + 1 }))
      )
    );
  }

  public toIso8601(date: Temporal.ZonedDateTime): string {
    return date.toString();
  }

  public isEqual(dateLeft: Temporal.ZonedDateTime, dateRight: Temporal.ZonedDateTime): boolean {
    if (this.isValid(dateLeft) && this.isValid(dateRight)) {
      return dateLeft === dateRight;
    } else {
      return false;
    }
  }

  public isSameDay(dateLeft: Temporal.ZonedDateTime, dateRight: Temporal.ZonedDateTime): boolean {
    if (this.isValid(dateLeft) && this.isValid(dateRight)) {
      return (
        dateLeft.year === dateRight.year &&
        dateLeft.month === dateRight.month &&
        dateLeft.day === dateRight.day
      );
    } else {
      return false;
    }
  }

  public isValid(date: Temporal.ZonedDateTime): boolean {
    return date && !isNaN(date.epochMilliseconds);
  }

  public invalid(): Temporal.ZonedDateTime {
    return null;
  }

  public isDateInstance(obj: any): boolean {
    return obj instanceof Temporal.ZonedDateTime;
  }

  public addCalendarYears(date: Temporal.ZonedDateTime, amount: number): Temporal.ZonedDateTime {
    return date.add({ years: Number(amount) });
  }

  public addCalendarMonths(date: Temporal.ZonedDateTime, amount: number): Temporal.ZonedDateTime {
    return date.add({ months: Number(amount) });
  }

  public addCalendarDays(date: Temporal.ZonedDateTime, amount: number): Temporal.ZonedDateTime {
    return date.add({ days: Number(amount) });
  }

  public setHours(date: Temporal.ZonedDateTime, amount: number): Temporal.ZonedDateTime {
    return date.with({ hour: Number(amount) });
  }

  public setMinutes(date: Temporal.ZonedDateTime, amount: number): Temporal.ZonedDateTime {
    return date.with({ minute: Number(amount) });
  }

  public setSeconds(date: Temporal.ZonedDateTime, amount: number): Temporal.ZonedDateTime {
    return date.with({ second: Number(amount) });
  }

  public createDate(
    year: number,
    month: number,
    date: number,
    hours: number = 0,
    minutes: number = 0,
    seconds: number = 0
  ): Temporal.ZonedDateTime {
    return Temporal.ZonedDateTime.from({
      year,
      month,
      day: date,
      hour: hours,
      minute: minutes,
      second: seconds,
      timeZone: this.timezone,
    });
  }

  public clone(date: Temporal.ZonedDateTime): Temporal.ZonedDateTime {
    return date.add(Temporal.Duration.from({ seconds: 1 })).subtract(Temporal.Duration.from({ seconds: 1 }));
  }

  public now(): Temporal.ZonedDateTime {
    return Temporal.Now.zonedDateTimeISO(this.timezone);
  }

  public format(date: Temporal.ZonedDateTime, displayFormat: any): string {
    if (!this.isValid(date)) {
      throw Error('JSNativeDate: Cannot format invalid date.');
    }

    if (
      this._clampDate &&
      (date.year < 1 || date.year > 9999)
    ) {
      date = date.with({
        year: Math.max(1, Math.min(9999, date.year)),
      });
    }

    displayFormat = { ...displayFormat, timeZone: this.timezone };
    const dtf = new Intl.DateTimeFormat(this.getLocale(), displayFormat);
    return this.stripDirectionalityCharacters(this._format(dtf, date));
  }

  public parse(value: any, parseFormat: any): Temporal.ZonedDateTime | null {
    // There is no way using the native JS Date to set the parse format or locale
    if (typeof value === 'number') {
      // TODO: meh
      return Temporal.Instant.fromEpochMilliseconds(value).toZonedDateTimeISO(this.timezone);
    }
    return value ? Temporal.ZonedDateTime.from(value) : null;
  }

  /**
   * Returns the given value if given a valid Date or null. Deserializes valid ISO 8601 strings
   * (https://www.ietf.org/rfc/rfc3339.txt) into valid Dates and empty string into null. Returns an
   * invalid date for all other values.
   */
  public deserialize(value: any): Temporal.ZonedDateTime | null {
    if (typeof value === 'string') {
      if (!value) {
        return null;
      }
      // The `Date` constructor accepts formats other than ISO 8601, so we need to make sure the
      // string is the right format first.
      if (ISO_8601_REGEX.test(value)) {
        let date;

        try {
          date = Temporal.ZonedDateTime.from(value);

        } catch (ignored: any) {
          date = Temporal.Instant.from(value).toZonedDateTimeISO(this.timezone);
        }

        if (this.isValid(date)) {
          return date;
        }
      }
    }
    return super.deserialize(value);
  }

  /**
   * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
   * other browsers do not. We remove them to make output consistent and because they interfere with
   * date parsing.
   */
  private stripDirectionalityCharacters(str: string) {
    return str.replace(/[\u200e\u200f]/g, '');
  }

  /**
   * When converting Date object to string, javascript built-in functions may return wrong
   * results because it applies its internal DST rules. The DST rules around the world change
   * very frequently, and the current valid rule is not always valid in previous years though.
   * We work around this problem building a new Date object which has its internal UTC
   * representation with the local date and time.
   */
  private _format(dtf: Intl.DateTimeFormat, date: Temporal.ZonedDateTime) {
    return dtf.format(date.epochMilliseconds);
  }

  private get timezone() {
    return new Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
}
