// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// TODO: look into performance impact with getters

export const environment = {
  twitchClientId: 'lsaqyn1omrou7dq2l12m0l865xyjsh',
  discordClientId: '559625844197163008',
  paypalClientId: 'Ac7rzLgpb5emA9JuRxRXpRDVMdULzgA_BxwyhPlAxPHtg1NtDv3nyjLcWgHBOUEmtdWJ5npWnMN-b7_8',

  // returns true for production builds
  get production() {
    return window.location.hostname !== 'localhost';
  },
  // returns true if this instance is considered a sandbox build
  get sandbox() {
    const host = window.location.hostname;

    return host.startsWith('sandbox') || host.endsWith('dev');
  },

  // this is the base of the website where the users will land
  get baseSite() {
    return window.location.origin;
  },
  // the api that the front-end talks to
  get api() {
    if (environment.production) {
      return environment.baseSite + '/api';
    }

    return 'http://localhost:8080';
  },
  // these two get the service name appended to it (eg twitch, twitter, discord)
  get loginRedirect() {
    return environment.baseSite + '/login/';
  },
  get syncRedirect() {
    return environment.baseSite + '/user/settings/sync/';
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
