// TODO: look into performance impact with getters

export const environment = {
  twitterClientId: 'WXg5Q1R5a05TX1VMNm5CNlJjYk46MTpjaQ', // oengus test
  twitchClientId: 'c3539b9q6x4ba7pomwa9fj1cs2culy', // oengus test
  discordClientId: '931093356006768681', // oengus test
  patreonClientId: 'qXKJ92UNMBtSTV_N0TN47U6l1o2_VXWmqK3u9_Gv3RXIJuiJ0LTpDyzbl5XZuARH',

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

  get v2Domain() {
    const url = window.location.hostname;

    if (url.startsWith('sandbox')) {
      return null;
    }

    const splitUrl = url.split('.');
    const parts = splitUrl.length > 2 ? [splitUrl[1], splitUrl[2]] : splitUrl;

    return `${window.location.protocol}//v2.${parts[0]}.${parts[1]}/`;
  },

  // the api that the front-end talks to
  get api() {
    if (environment.production) {
      const url = window.location.hostname;
      const splitUrl = url.split('.');
      const parts = splitUrl.length > 2 ? [splitUrl[1], splitUrl[2]] : splitUrl;

      return `${window.location.protocol}//${parts[0]}.${parts[1]}/api`;
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
