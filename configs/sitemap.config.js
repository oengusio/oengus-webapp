// Sitemap configuration: https://sitemap.nuxtjs.org/

import { locales } from './i18n.config';

export function sitemapConfig(process) {
  return {
    hostname: `https://${process.env.DOMAIN ?? 'v2.oengus.dev'}`,
    i18n: {
      locales,
    },
    exclude: [
      '/user/settings',
      '/user/settings/**',
    ],
  };
}
