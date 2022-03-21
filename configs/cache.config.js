// SSR Cache configuration: https://www.npmjs.com/package/nuxt-ssr-cache

import { locales } from './i18n.config';

const localesRegExpHelper = locales.map(locale => locale.code).join('|');
const specialPageTimeouts = [
  { pages: [ new RegExp(`^(/(${localesRegExpHelper}))?/marathon/[^/?]+/submissions/?$`) ], ttl: 15 * 60 },
];

export function cacheConfig(process) {
  return {
    useHostPrefix: false,
    pages: [ '/' ],
    ttlOverride(route) {
      return specialPageTimeouts.find(specialPlay => specialPlay.pages.some(pattern => pattern.test(route)))?.ttl;
    },
    store: {
      type: 'multi',
      stores: [
        {
          // Uses an in-memory LRU caching strategy.
          // For present time, covers all caching, but eventually this should
          // handle a "massively used" cache with a short timeout and capacity.
          type: 'memory',
          max: 100,
          // Five minutes
          ttl: process.env.NODE_ENV === 'production' ? 5 * 60 : 5,
        },
        // {
        //   type: 'memcached',
        //   ttl: process.env.NODE_ENV === 'production' ? 5 * 60 : 5,
        //   options: {
        //     hosts: [ process.env.CACHE_HOST ],
        //   },
        // },
      ],
    },
  };
}
