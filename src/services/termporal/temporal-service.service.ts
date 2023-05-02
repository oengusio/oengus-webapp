import { Injectable } from '@angular/core';
import { LocaleSensitive } from './i18n';
import { distance as distanceImport } from './distance';
import { timeZone as timeZoneImport } from './time-zone';
import { formatting as formattingImport } from './formatting';

@Injectable({
  providedIn: 'root'
})
export class TemporalServiceService implements LocaleSensitive {
  private _locale: string;

  get distance() {
    return distanceImport;
  }

  get timeZone() {
    return timeZoneImport;
  }

  get locale(): string {
    return this._locale;
  }

  get format() {
    return formattingImport;
  }

  changeLocale(locale: string): void {
    this._locale = locale;
    this.distance.changeLocale(locale);
    this.format.changeLocale(locale);
  }
}
