// i18n configuration: https://i18n.nuxtjs.org/

// We use these in many places, so it's provided as part of the module
export const locales = [
  { code: 'ca', iso: 'ca', file: 'ca.json', nativeName: 'Català' },
  { code: 'cy', iso: 'cy', file: 'cy.json', nativeName: 'Cymraeg' },
  { code: 'da', iso: 'da', file: 'da.json', nativeName: 'dansk' },
  { code: 'de', iso: 'de', file: 'de.json', nativeName: 'Deutsch' },
  { code: 'el', iso: 'el', file: 'el.json', nativeName: 'Ελληνικά' },
  { code: 'en-GB', iso: 'en-GB', file: 'en.json', nativeName: 'English', isCatchallLocale: true },
  { code: 'en-US', iso: 'en-US', file: 'en.json', nativeName: 'English (United States)' },
  { code: 'es', iso: 'es', file: 'es.json', nativeName: 'español' },
  { code: 'fi', iso: 'fi', file: 'fi.json', nativeName: 'suomi' },
  { code: 'fr', iso: 'fr', file: 'fr.json', nativeName: 'français' },
  { code: 'it', iso: 'it', file: 'it.json', nativeName: 'Italiano' },
  { code: 'ja', iso: 'ja', file: 'ja.json', nativeName: '日本語' },
  { code: 'ko', iso: 'ko', file: 'ko.json', nativeName: '한국어 (韓國語)' },
  { code: 'nb-NO', iso: 'nb-NO', file: 'nb_NO.json', nativeName: 'Norsk bokmål' },
  { code: 'nl', iso: 'nl', file: 'nl.json', nativeName: 'Nederlands' },
  { code: 'pt-BR', iso: 'pt-BR', file: 'pt_BR.json', nativeName: 'Português (Brazil)' },
  { code: 'ru', iso: 'ru', file: 'ru.json', nativeName: 'русский язык' },
  { code: 'tr', iso: 'tr', file: 'tr.json', nativeName: 'Türkçe' },
  { code: 'zh-Hans', iso: 'zh', file: 'zh_Hans.json', nativeName: '中文 (简体中文)', isCatchallLocale: true },
  { code: 'zh-Hant-HK', iso: 'zh-HK', file: 'zh_Hant_HK.json', nativeName: '中文 (香港)' },
];

export const dateTimeFormats = {
  longDate: { dateStyle: 'long' },
  shortDate: { dateStyle: 'short' },
  longMonth: { year: 'numeric', month: 'long' },
  shortTime: { timeStyle: 'short' },
  mediumDateTime: { dateStyle: 'medium', timeStyle: 'short' },
};

export const numberFormats = {
  currency: { style: 'currency' },
};

export function i18nConfig() {
  return {
    locales,
    defaultLocale: 'en-GB',
    strategy: 'prefix',
    detectBrowserLanguage: false,
    langDir: '~/locales/',
    lazy: true,
    vueI18nLoader: true,
    // This import takes places inside webpack from a different PWD, so we need the ~ pathing
    vueI18n: '~/configs/vue-i18n.config.js',
  };
}
