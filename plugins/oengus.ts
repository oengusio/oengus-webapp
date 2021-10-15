import { ActionContext } from 'vuex';
import { NuxtHTTPInstance } from '@nuxt/http';
import { Context } from '@nuxt/types';

export interface OengusStateCacheable<V> {
  _cachedAt: number;
  _fetching: boolean;
  _promise: Promise<V&OengusStateCacheable<V>>;
}
export type OengusStateValue<V> = V&OengusStateCacheable<V>|OengusStateCacheable<V>|undefined;
export interface OengusStateValuesById<V> {
  [ id: string ]: OengusStateValue<V>;
}
export interface OengusState {
  [ key: string ]: OengusStateValuesById<any>|OengusStateValue<any>;
}

/**
 * Used to create a specific API endpoint
 * U refers to the type retruned by the API
 * V refers to the type that ends up in the state and defaults to U
 */
export interface GetterArgs<U, V = U> {
  /**
   * Final portion of the API path.
   * Follows the id, if provided, which in turn follows the basePath.
   * e.g. basePath/id/path or basePath/path
   */
  path?: string;
  /**
   * Key these responses are stored in in the state object
   * e.g. state[key]
   */
  key: string;
  /**
   * Name of the mutation function to store the responses
   * If not provided, uses addKey, e.g. if key is 'users' it picks 'addUsers'
   */
  mutation?: string;
  /**
   * Used to alter the raw API response to whatever is stored in the state
   * This can be strip, change, or add new values or even change into a full class
   */
  transform?(value: U, id?: number|string): V;
  /**
   * How long should responses be cached for
   * Can be ignored with forceFetch
   * Defaults to 5 minutes
   */
  cacheDuration?: number;
}

export interface ExtendedFetch {
  id?: number|string;
  forceFetch?: boolean;
}

/**
 * The actual function returned by a specific API for the action
 * T refers to the state
 * V refers to the type that ends up in the state
 */
export type GetterFunc<T, V> = (context: ActionContext<T, T>, id?: number|string|ExtendedFetch) => Promise<V|undefined>;

export class OengusAPI<T extends OengusState> {
  static http: NuxtHTTPInstance;

  /* eslint-disable-next-line no-useless-constructor */ /* ESLint doesn't understand this constructor ISN'T useless in TypeScript */
  constructor(private basePath: string) { }

  /**
   * U is the type returned by the API
   * V is the type that will get stored. V is equal to U except when transform is given
   */
  public get<U, V = U>(
    { path, key, transform, mutation: _mutation, cacheDuration: _cacheDuration }: GetterArgs<U, V>,
  ): GetterFunc<T, V> {
    const mutation = _mutation ?? `add${key[0].toUpperCase()}${key.slice(1)}`;
    // Five minutes unless overridden
    const cacheDuration = _cacheDuration ?? 300_000;
    return async ({ commit, state }, id) => {
      let forceFetch = false;
      if (typeof id === 'object') {
        forceFetch = id.forceFetch ?? forceFetch;
        id = id.id;
      }

      // Cache check
      const cachedResponse: OengusStateValue<V> = id ? state[key][id] : state[key];
      const cachedTime = cachedResponse?._cachedAt ?? 0;
      const fetching = cachedResponse?._fetching ?? false;
      if (fetching || (!forceFetch && cachedTime + cacheDuration > Date.now())) {
        return cachedResponse as V;
      }

      // Setup the fetching promise
      let fetchingResolve: (value: OengusStateValue<V>) => void;
      let fetchingReject: (reason: { reason?: any, oldValue: OengusStateValue<V> }) => void;
      const fetchingPromise = new Promise<OengusStateValue<V>>((resolve, reject) => {
        fetchingResolve = resolve;
        fetchingReject = reject;
      });

      // Mark the entry as updating by changing _fetching property
      if (cachedTime) {
        // This allows existing stuff to continue to use the cached value,
        commit(mutation, { id, value: { ...cachedResponse, _fetching: true, _promise: fetchingPromise } });
      } else {
        commit(mutation, { id, value: { _cachedAt: Date.now(), _fetching: true, _promise: fetchingPromise } });
      }

      // Fetch and store into cache
      const route = `${this.basePath}${id ? `/${id}` : ''}${path ? `/${path}` : ''}`;
      let apiResponse: U;
      try {
        apiResponse = await OengusAPI.http.$get(route);
      } catch (error) {
        // This isn't intrinsically bad, just catch the error, mark as not fetching, and return the old value
        // Put the old value back in full, maybe the API is just down (should we worry about loops?)
        fetchingReject!({ reason: error, oldValue: cachedResponse });
        commit(mutation, { id, value: cachedResponse });
        return;
      }

      const response = {
        ...(transform ? transform(apiResponse as U, id) : apiResponse),
        _fetching: false,
        _cachedAt: Date.now(),
        _promise: fetchingPromise,
      } as OengusStateValue<V>;
      fetchingResolve!(response);
      commit(mutation, { id, value: response });
      return response as V;
    };
  }
}

/**
 * Makes sure anything that OengusAPI needs is created
 * All values this write to must be static, so they can be shared among instances
 */
export default function setupOengusAPI({ $http }: Context) {
  OengusAPI.http = $http;
}
