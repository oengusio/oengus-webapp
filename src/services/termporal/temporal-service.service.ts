import { Injectable } from '@angular/core';
import { LocaleSensitive } from './i18n';
import { distance as distanceImport } from './distance';
import { timeZone as timeZoneImport } from './time-zone';

@Injectable({
  providedIn: 'root'
})
export class TemporalServiceService implements LocaleSensitive {

  get distance() {
    return distanceImport;
  }

  get timeZone() {
    return timeZoneImport;
  }

  changeLocale(locale: string): void {
    this.distance.changeLocale(locale);
  }
}
