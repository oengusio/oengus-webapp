// Moment configuration: https://github.com/nuxt-community/moment-module

import { locales } from './i18n.config';

export function momentConfig() {
  return {
    defaultLocale: 'en',
    locales: locales
      // You're not ALLOWED to specify 'en' even though it is always included
      // We can safely assume that any momentIso values provided will always be included
      .filter(locale => locale.iso !== 'en' || locale.momentIso)
      .map(locale => (locale.momentIso ?? locale.iso).toLocaleLowerCase()),
    timezone: true,
  };
}
