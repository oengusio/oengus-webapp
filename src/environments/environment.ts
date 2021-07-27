// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  // is this a production build
  production: false,
  // is this a sandbox build
  sandbox: false,
  // this is the base of the website where the users will land
  baseSite: 'http://localhost:4200',
  // the api that the front-end talks to
  api: 'http://localhost:8080',
  // Optional, in case of a custom hosted patreon api, will use api by default
  patronApi: 'http://localhost:9000',
  twitchClientId: 'lsaqyn1omrou7dq2l12m0l865xyjsh',
  // these two get the service name appended to it (eg twitch, twitter, discord)
  loginRedirect: 'http://localhost:4200/login/',
  syncRedirect: 'http://localhost:4200/user/settings/sync/',
  discordClientId: '559625844197163008',
  paypalClientId: 'AV9-0fSGWREDWpnMJujrHUbDIibragMgE4-4HuAS-WQPlgHSRyfeU5iqNyiQwLEGZFEKhAiERJdv80a4',
  patreonClientId: 'qXKJ92UNMBtSTV_N0TN47U6l1o2_VXWmqK3u9_Gv3RXIJuiJ0LTpDyzbl5XZuARH'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
