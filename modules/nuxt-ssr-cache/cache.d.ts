import type { IncomingMessage, ServerResponse } from 'http';

export interface RouteContext {
  req: IncomingMessage;
  res: ServerResponse;
}

export type CacheStoreType = 'multi'|'memory'|'memcached'|'redis';

export interface MemoryCacheStore {
  type: 'memory';
  ttl: number;
  max?: number;
}

export interface MemcachedCacheStore {
  type: 'memcached';
  ttl: number;
  options: {
    hosts: Array<string>;
  };
}

export interface RedisCacheStore {
  type: 'redis';
  host: string;
  ttl: number;
  configure?: Array<[ string, string ]>;
}

export type CacheStoreConfig = MemoryCacheStore|MemcachedCacheStore|RedisCacheStore;

export interface MultiCacheConfig {
  type: 'multi';
  stores: Array<CacheStoreConfig>;
}

export interface CacheConfig {
  useHostPrefix?: boolean;
  pages: Array<string|RegExp>;
  key?: (route: string, context: RouteContext) => string|false;
  ttlOverride?: (route: string, context: RouteContext) => number|undefined;
  isCacheable?: (route: string, context: RouteContext) => boolean;
  version?: string;
  store: CacheStoreConfig|MultiCacheConfig;
}

export interface RendererResponse {
  html: string;
  error: null | { statusCode: number, message: string };
  redirected: false | { path: string, query: object, status: number };
}

export interface NuxtRenderer {
  renderRoute: (route: string, context: RouteContext) => Promise<RendererResponse>;
}

declare module '@nuxt/types' {
  interface NuxtOptions {
    cache: CacheConfig;
  }

}
