import { ActionContext } from 'vuex';
import { NuxtHTTPInstance } from '@nuxt/http';
import { Context } from '@nuxt/types';

export interface OengusState {
  [ key: string ]: any;
}

export interface GetterArgs<U, V> {
  path?: string;
  key: string;
  transform?(value: U, id?: number|string): V;
  mutation?: string;
}

export type GetterFunc<T, V> = (context: ActionContext<T, T>, id?: number|string) => Promise<V|undefined>;

export class OengusAPI<T extends OengusState> {
  static http: NuxtHTTPInstance;

  /* eslint-disable-next-line no-useless-constructor */ /* ESLint doesn't understand this constructor ISN'T useless in TypeScript */
  constructor(private basePath: string) { }

  /**
   * U is the type returned by the API
   * V is the type that will get stored. V is equal to U except when transform is given
   */
  public get<U, V = U>({ path, key, transform, mutation }: GetterArgs<U, V>): GetterFunc<T, V> {
    return async ({ commit, state }, id) => {
      // Cache check (needs improvements)
      let response: U|V = id ? state[key][id] : state[key];
      if (response !== undefined) {
        return response as V;
      }
      const resolvedMutation = mutation ?? `add${key[0].toUpperCase()}${key.slice(1)}`;
      // Mark the entry as "being fetched" by marking it `null` (only `undefined` is empty)
      commit(resolvedMutation, { id, value: null });
      // Fetch and store into cache
      try {
        response = await OengusAPI.http.$get(`${this.basePath}${id ? `/${id}` : ''}${path ? `/${path}` : ''}`);
      } catch {
        // This isn't intrinsically bad, just catch the error, mark as not fetching, and return nothing
        commit(resolvedMutation, { id, value: undefined });
        return;
      }
      if (transform) {
        response = transform(response as U, id);
      }
      commit(resolvedMutation, { id, value: response as V });
      return response as V;
    };
  }
}

export default function setupOengusAPI({ $http }: Context) {
  OengusAPI.http = $http;
}
