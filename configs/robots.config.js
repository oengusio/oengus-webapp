// robots configuration: https://github.com/nuxt-community/robots-module

import { locales } from './i18n.config';

export function robotsConfig() {
  return {
    UserAgent: '*',
    Disallow: [
      'login/',
      // Disallow both the page and directory
      'user/settings',
      'user/settings/',
    ].reduce((rules, page) => rules.concat(locales.map(locale => `/${locale.code}/${page}`)), []),
    // TODO Should be a dynamically bound URL to be fed through ENV
    Sitemap: 'https://v2.oengus.dev/sitemap.xml',
  };
}
