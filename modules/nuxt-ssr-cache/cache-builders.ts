import { Cache, MultiCache, caching, multiCaching } from 'cache-manager';
import { CacheStoreConfig, MemcachedCacheStore, MemoryCacheStore, MultiCacheConfig, RedisCacheStore } from './cache';

function memoryCache(config: MemoryCacheStore): Cache {
  return caching({
    store: 'memory',
    ...config,
  });
}

function redisCache(config: RedisCacheStore): Cache {
  if (config && Array.isArray(config.configure)) {
    const redis = require('redis');
    const client = redis.createClient({
      retry_strategy() {},
      ...config,
    });

    Promise
      .all(config.configure.map(options => new Promise<'OK'>((resolve, reject) => {
        client.config('SET', ...options, function (err: any, result: any) {
          if (err || result !== 'OK') {
            reject(err);
          } else {
            resolve(result);
          }
        });
      })))
      .then(() => client.quit());
  }

  return caching({
    store: require('cache-manager-redis'),
    retry_strategy() {},
    ...config,
  });
}

function memcachedCache(config: MemcachedCacheStore): Cache {
  return caching({
    store: require('cache-manager-memcached-store'),
    ...config,
  });
}

function multiCache(config: MultiCacheConfig): MultiCache {
  const stores = config.stores.map(makeCache) as Array<Cache>;
  return multiCaching(stores);
}

const cacheBuilders = {
  memory: memoryCache,
  multi: multiCache,
  redis: redisCache,
  memcached: memcachedCache,
};

export function makeCache(config: CacheStoreConfig|MultiCacheConfig = { type: 'memory', ttl: 60 }): MultiCache|Cache {
  const builder = cacheBuilders[config.type] as (config: CacheStoreConfig|MultiCacheConfig) => Cache|MultiCache;
  if (!builder) {
    throw new Error('Unknown store type: ' + config.type);
  }

  return builder(config);
}
