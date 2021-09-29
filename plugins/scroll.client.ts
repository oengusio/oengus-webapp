import { Plugin } from '@nuxt/types';
import { Route } from 'vue-router';

/**
 * How does this work? A good question. It may be buggy.
 *
 * When user navigation occurs, history is written to the browser to be used by
 * the back/forward buttons. This history maintains an immutable state for each
 * page. We are referencing one of the values of that state stack, the key. In
 * Chrome and Firefox, this /appears/ to be a monotonically increasing
 * string-encoded number. Possibly the number of milliseconds since the
 * page/website was first navigated to. More testing is required.
 *
 * We detect when the value on the page we're on is higher than the largest
 * value we've seen before. If it is, it's a new page, and we scroll. If it's
 * not, we rely on the user's browser settings to decide to scroll to their
 * previous position or not, depending on preferences.
 *
 * This function is called universally by watching to see when $route changes
 * in the layout for the pages. If it's broken, first confirm your page's
 * layout does call this.$scroll() inside of watch on $route.
 */

const scroll = {
  /**
   * To be called on navigation
   */
  onNavigation($route: Route): void {
    const historyKey = +history.state.key;
    if (this._historyKeyMax < historyKey) {
      this._historyKeyMax = historyKey;
      if (!$route.hash) {
        globalThis.scrollTo(0, 0);
      } else {
        // Take over the browser's usual job of scrolling, because some won't
        this.toHash($route.hash);
      }
    }
  },
  /**
   * Moves to a given hash on a page if it exists. Can be given without or without a # sign
   */
  toHash(hash: string): void {
    if (hash.startsWith('#')) {
      hash = hash.slice(1);
    }
    const target = globalThis.document.getElementById(hash);
    const boundingClientRect = target?.getBoundingClientRect();
    globalThis.scrollBy(0, boundingClientRect?.y ?? 0);
  },
  _historyKeyMax: 0,
};

const scrollPlugin: Plugin = (_, inject) => {
  inject('scroll', scroll);
};

declare module 'vue/types/vue' {
  interface Vue {
    $scroll: typeof scroll;
  }
}

export default scrollPlugin;
