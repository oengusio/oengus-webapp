// Sitemap configuration: https://sitemap.nuxtjs.org/

import { locales } from './i18n.config';

export function sitemapConfig() {
  return {
    hostname: 'https://v2.oengus.dev',
    i18n: {
      locales,
    },
    exclude: [
      '/user/settings',
      '/user/settings/**',
    ],
  };
}
