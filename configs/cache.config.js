// SSR Cache configuration: https://www.npmjs.com/package/nuxt-ssr-cache

export function cacheConfig(process) {
  return {
    useHostPrefix: false,
    pages: [ '/' ],
    // The default key function contains a bug that sometimes causes it to fail
    key(route) {
      return route;
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
        // Will not let us specify a TTL and so cache is immortal.
        // Improvements or replacements will have to occur.
        // {
        //   type: 'memcached',
        //   options: {
        //     hosts: [ process.env.CACHE_HOST ],
        //   },
        // },
      ],
    },
  };
}
