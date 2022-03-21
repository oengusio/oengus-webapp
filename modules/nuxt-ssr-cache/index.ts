// Originally middleware.js, but changed to index.js as it's the entry point for this version

import { Module } from '@nuxt/types';
import { Cache, MultiCache } from 'cache-manager';
import { RouteContext, CacheConfig, RendererResponse, NuxtRenderer } from './cache';
import { makeCache } from './cache-builders';
import { serialize, deserialize } from './serializer';

async function cleanIfNewVersion(cache: Cache|MultiCache, version?: string): Promise<void> {
  if (!version) {
    return;
  }

  const oldVersion = await cache.get<string>('appVersion');
  if (oldVersion !== version) {
    /* eslint-disable-next-line no-console */
    console.log(`Cache updated from ${oldVersion} to ${version}`);
    return new Promise<void>(resolve => cache.reset(resolve));
  }
}

async function tryStoreVersion(cache: Cache|MultiCache, version?: string): Promise<void> {
  if (!version) {
    return;
  }
  await cache.set('appVersion', version, { ttl: 0 });
}

const cacheRenderer: Module<CacheConfig> = function (): void {
  const nuxt = this.nuxt;
  const config = this.options;

  if (!config.cache || !Array.isArray(config.cache.pages) || !config.cache.pages.length || !nuxt.renderer) {
    return;
  }

  function isCacheFriendly(path: string, context: RouteContext): boolean {
    if (typeof config.cache.isCacheable === 'function') {
      return config.cache.isCacheable(path, context);
    }

    return config.cache.pages.some(pat => pat instanceof RegExp ? pat.test(path) : path.startsWith(pat));
  }

  function defaultCacheKeyBuilder(route: string, context: RouteContext): string|undefined {
    const cacheKey = route;

    if (isCacheFriendly(route, context)) {
      return cacheKey;
    }
  }

  const currentVersion = config.version || config.cache.version;
  const cache = makeCache(config.cache.store);
  const cleanedPromise = cleanIfNewVersion(cache, currentVersion);

  const renderer = nuxt.renderer as NuxtRenderer;
  const renderRoute = renderer.renderRoute.bind(renderer);
  renderer.renderRoute = async function (route: string, context: RouteContext): Promise<RendererResponse> {
    await cleanedPromise;
    await tryStoreVersion(cache, currentVersion);

    const cacheKey = (config.cache.key || defaultCacheKeyBuilder)(route, context);
    if (!cacheKey) {
      return renderRoute(route, context);
    }

    async function renderSetCache(): Promise<RendererResponse> {
      const result = await renderRoute(route, context);
      if (!result.error && !result.redirected) {
        const ttl = config.cache.ttlOverride?.(route, context);
        if ((Number.isFinite(ttl) && ttl! >= 0) || typeof ttl === 'function') {
          // Only cache for 0 (infinite) or positive finite values
          cache.set(cacheKey as string, serialize(result), { ttl: ttl! });
        } else {
          cache.set(cacheKey as string, serialize(result));
        }
      }
      return result;
    }

    try {
      const cachedResult = await cache.get<string>(cacheKey);
      if (cachedResult) {
        return deserialize(cachedResult);
      }
      return renderSetCache();
    } catch {
      return renderSetCache();
    }
  };
};

export default cacheRenderer;
