import { ActionContext } from 'vuex';
import { NuxtHTTPInstance } from '@nuxt/http';
import { Context } from '@nuxt/types';

export interface OengusStateCacheable {
  _expires: number;
}
export type OengusStateValue<V> = V&OengusStateCacheable|OengusStateCacheable|undefined;
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
  transform?(value: U, id?: number|string): V&OengusStateCacheable;
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
      let response: OengusStateValue<U|V> = id ? state[key][id] : state[key];
      const cachedTime = response?._expires ?? 0;
      if (cachedTime + cacheDuration > Date.now() && !forceFetch) {
        return response as V;
      }

      if (cachedTime) {
        // Mark the entry as updating by changing the cache expired marker
        // This allows existing stuff to continue to use the cached value,
        commit(mutation, { id, value: { ...response, _expires: Date.now() } });
      } else {
        // Mark the entry as "being fetched" by giving it a promise
        // Anything that wants to read the value is welcome to await it or use Vuex's observers
        commit(mutation, { id, value: { _expires: Date.now() } });
      }

      // Fetch and store into cache
      const route = `${this.basePath}${id ? `/${id}` : ''}${path ? `/${path}` : ''}`;
      let apiResponse: U&OengusStateCacheable;
      try {
        apiResponse = await OengusAPI.http.$get(route);
      } catch {
        // This isn't intrinsically bad, just catch the error, mark as not fetching, and return nothing
        if (cachedTime) {
          // Reset the old cache timer, maybe the API is just down (should we worry about loops?)
          commit(mutation, { id, value: response });
        } else {
          commit(mutation, { id, value: undefined });
        }
        return;
      }
      response = apiResponse;

      if (transform) {
        response = transform(response as U, id);
      }
      response._expires = Date.now();
      commit(mutation, { id, value: response as OengusStateValue<V> });
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
