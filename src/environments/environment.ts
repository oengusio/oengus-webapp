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
  // api: 'http://localhost:8080',
  api: 'https://oengus.dev/api',
  twitchClientId: 'lsaqyn1omrou7dq2l12m0l865xyjsh',
  // these two get the service name appended to it (eg twitch, twitter, discord)
  loginRedirect: 'http://localhost:4200/login/',
  syncRedirect: 'http://localhost:4200/user/settings/sync/',
  discordClientId: '559625844197163008',
  paypalClientId: 'Ac7rzLgpb5emA9JuRxRXpRDVMdULzgA_BxwyhPlAxPHtg1NtDv3nyjLcWgHBOUEmtdWJ5npWnMN-b7_8'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
