import { ActionContext } from 'vuex';

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
  /** The route parameter that needs to be sent as part of the URL */
  id?: number|string;
  /** If true, ignores cache. If uncached, but actively fetching, won't retrieve again */
  forceFetch?: boolean;
  /**
   * Request body (GET params for GET, body for POST/PUT etc)
   *
   * Be careful when sending data, as it cannot access the cache
   */
  data?: any;
}

/**
 * The actual function returned by a specific API for the action
 * T refers to the state
 * V refers to the type that ends up in the state
 */
export type GetterFunc<T, V> = (context: ActionContext<T, T>, id?: number|string|ExtendedFetch) => Promise<V|undefined>;

export interface RouteSpecification {
  // Base portion of the path, typically indicates what type of thing is being requested
  basePath: string;
  // Unique identifier for the thing being fetched
  id?: string|number;
  // A specific path with the thing being indicated
  path?: string;
  // Returns the full url including protocol and domain if provided and true
  fullURL?: boolean;
}
