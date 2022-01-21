// Protects pages that should not be part of v2 in production and makes them point to v1

import { Middleware } from '@nuxt/types';

/** These pages are handled by v2 */
const oengusV2Pages: Array<Array<string>> = [
  // Homepage
  [ ],
  [ 'about' ],
  [ 'calendar' ],
  [ 'calendar', '*', '*' ],
  [ 'marathon', '*' ],
  [ 'marathon', '*', 'schedule' ],
  [ 'news', 'kaspersky-partnership' ],
  [ 'patrons' ],
  [ 'user', '*' ],
];

/** These pages match wildcards but are NOT handled by v2. */
const oengusV2PagesExceptions: Array<Array<string>> = [
  [ 'marathon', 'new' ],
  [ 'user', 'new' ],
  [ 'user', 'settings' ],
];

const oengusV1Redirect: Middleware = function ({ $config, route, from, redirect, localePath }): void {
  if (!$config.env.DOMAIN_V1) {
    return;
  }
  // localePath is smart enough to only add/change a locale when necessary, this allows us to handle
  // incoming requests that don't include the locale portion of the path without weird redirects
  let to = localePath(route.path)
    .split('/')
    // Remove leading, trailing, and duplicated `/` portions
    .filter(part => part)
    // Drop the language part of the URL (sorry, you're on your own for lang on v1)
    .slice(1);
  let shouldRedirect = to[to.length - 1] === 'v1';
  if (shouldRedirect) {
    // If this is an explicit redirect, strip out the redirect pointer
    to = to.slice(0, -1);
  } else {
    // Otherwise, check if this page should redirected by checking if it should not be kept
    shouldRedirect = !oengusV2Pages.some(v2Page => v2Page.length === to.length && v2Page.every((part, i) => part !== '*' ? part === to[i] : true));
    shouldRedirect ||= oengusV2PagesExceptions.some(v2Page => v2Page.length === to.length && v2Page.every((part, i) => part === to[i]));
  }
  if (shouldRedirect) {
    // For some reason, `redirect` doesn't seem to handle browser history correctly.
    // If you hit back, you get the page BEFORE the page you clicked the link on.
    // This makes sure we push an entry to the history stack to go back to.
    // If we start having doubled up history, this history.pushState is a good candidate to check.
    globalThis.history?.pushState((Number.parseFloat(history.state) + 1).toFixed(3), document.title, from.fullPath);
    redirect(`https://${$config.env.DOMAIN_V1}/${to.join('/')}`);
  }
};

export default oengusV1Redirect;
