import { Injectable } from '@angular/core';
import moment from 'moment-timezone';
import { TranslateService } from '@ngx-translate/core';
import { TemporalServiceService } from './termporal/temporal-service.service';
import { DateTimeAdapter } from '@busacca/ng-pick-datetime';
import { registerLocaleData } from '@angular/common';
import localeEnGb from '@angular/common/locales/en-GB';
import localeEn from '@angular/common/locales/en';
import localeFr from '@angular/common/locales/fr';
import localeDe from '@angular/common/locales/de';
import localeNl from '@angular/common/locales/nl';
import localeJa from '@angular/common/locales/ja';
import localeCy from '@angular/common/locales/cy';
import localeEs from '@angular/common/locales/es';
import localePt from '@angular/common/locales/pt';
import localeEl from '@angular/common/locales/el';
import localeIt from '@angular/common/locales/it';
import localeZhHk from '@angular/common/locales/zh-Hant-HK';
import localeTr from '@angular/common/locales/tr';
import localeKo from '@angular/common/locales/ko';
import localeDa from '@angular/common/locales/da';
import localeFi from '@angular/common/locales/fi';
import localeCa from '@angular/common/locales/ca';
import localeRu from '@angular/common/locales/ru';
import isoLang from '../assets/languages.json';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {
  public language = localStorage.getItem('language') ? localStorage.getItem('language') : navigator.language.split('-')[0];

  // removed languages have none to no translations
  public availableLocales = {
    'ca': localeCa,
    'cy': localeCy,
    'en-GB': localeEnGb,
    'en': localeEn,
    'da': localeDa,
    'de': localeDe,
    'el': localeEl,
    'es': localeEs,
    'fi': localeFi,
    'fr': localeFr,
    'it': localeIt,
    'ja': localeJa,
    'ko': localeKo,
    'nl': localeNl,
    'pt_BR': localePt,
    'ru': localeRu,
    'tr': localeTr,
    'zh_Hant_HK': localeZhHk,
  };

  constructor(private translate: TranslateService,
              private translateRouter: LocalizeRouterService,
              private dateTimeAdapter: DateTimeAdapter<any>,
              private temporal: TemporalServiceService) {
  }

  get languagesJson(): { [key: string]: { name: string; nativeName: string } } {
    return isoLang;
  }

  get availableLocaleNames(): string [] {
    return Object.keys(this.availableLocales);
  }

  initialize(): void {
    for (const lang of this.availableLocaleNames) {
      registerLocaleData(this.availableLocales[lang], lang);
    }

    const langFromUrl = this.translateRouter.parser.currentLang;

    if (langFromUrl) {
      this.language = langFromUrl;
    }

    this.translate.setDefaultLang('en-GB');

    if (this.language in this.availableLocales) {
      console.log('Setting language to ' + this.language);
      this.useLanguage(this.language);
    } else {
      this.useLanguage('en-GB');
    }
  }

  useLanguage(language: string): void {
    this.language = language;
    localStorage.setItem('language', language);
    this.translate.use(language);
    this.translateRouter.changeLanguage(language);
    this.temporal.changeLocale(language);

    this.setMomentTimezone(language);

    this.dateTimeAdapter.setLocale(language.split('_')[0]);
  }

  setMomentTimezone(language: string): void {
    const date = new Date();

    if (date.getMonth() === 3 && date.getDate() === 1 && date.getHours() >= 14 ) {
      moment.locale('x-pseudo');
    } else if (language === 'zh_Hant_HK') {
      moment.locale('zh_hk');
    } else {
      moment.locale(language.split('_')[0].replace('en', 'en_GB'));
    }
  }
}
