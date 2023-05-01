import { Injectable } from '@angular/core';
import { LocaleSensitive } from './i18n';
import { distance as distanceImport } from './distance';

@Injectable({
  providedIn: 'root'
})
export class TemporalServiceService implements LocaleSensitive {

  constructor() { }

  get distance() {
    return distanceImport;
  }

  changeLocale(locale: string): void {
    //
  }
}
