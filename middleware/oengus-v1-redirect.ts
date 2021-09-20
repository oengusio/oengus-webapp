// Protects pages that should not be part of v2 in production and makes them point to v1

import { Middleware } from '@nuxt/types';

const oengusV2Pages: Array<Array<string>> = [
  // Homepage
  [ ],
  [ 'marathon', '*' ],
  [ 'marathon', '*', 'schedule' ],
  [ 'news', 'kaspersky' ],
];

const oengusV1Redirect: Middleware = function ({ $config, route, redirect, from }): void {
  if (!$config.env.DOMAIN_V1) {
    return;
  }
  let to = route.path
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
  }
  if (to[0] === 'user' && ![ 'new', 'settings' ].includes(to[1])) {
    // This is a user profile, clean this up before redirecting
    to.splice(1, 0, 'profile');
  }
  if (shouldRedirect) {
    // For some reason, `redirect` doesn't seem to handle browser history correctly.
    // If you hit back, you get the page BEFORE the page you clicked the link on.
    // This makes sure we push an entry to the history stack to go back to.
    // If we start having doubled up history, this history.pushState is a good candidate to check.
    history.pushState((Number.parseFloat(history.state) + 1).toFixed(3), document.title, from.fullPath);
    redirect(`https://${$config.env.DOMAIN_V1}/${to.join('/')}`);
  }
};

export default oengusV1Redirect;
