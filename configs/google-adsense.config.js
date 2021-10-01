// Google AdSense configuration: https://github.com/nuxt-community/google-adsense-module

import { mainGTagId } from './google-gtag.config';

export function googleAdSenseConfig() {
  return {
    id: 'ca-pub-1125692619955117',
    tag: 'AdsByGoogle',
    analyticsUacct: mainGTagId,
    // TODO Is this right? If not, what does it want? process.env.DOMAIN?
    analyticsDomainName: 'oengus.io',
  };
}
