// TODO: look into performance impact with getters

export const environment = {
  twitchClientId: 'f4ry4d9k0dt89ha8ks7cb845trvbod',
  discordClientId: '559625844197163008',

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
  },
  get paypalClientId() {
    if (environment.sandbox) {
      return 'AV9-0fSGWREDWpnMJujrHUbDIibragMgE4-4HuAS-WQPlgHSRyfeU5iqNyiQwLEGZFEKhAiERJdv80a4';
    }

    return 'AfkLlDPvmM0v1914bih8VN0x0LZps-jkjdz-A7ydiJ0RVPdaAC730VWtVkTWaXZauBYVs3UbaoRHc6VH';
  },
  get patronApi() {
    if (environment.production) {
      return environment.api + '/patreon';
    }

    return 'http://localhost:9000';
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
