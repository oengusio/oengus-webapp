export const environment = {
  production: true,
  sandbox: false,
  // baseSite: 'https://oengus.io',
  get baseSite() {
    return window.location.origin;
  },
  api: 'https://oengus.io/api',
  twitterClientId: 'Z0Zta2JiTjNLQU5iNHlBbGcyLUI6MTpjaQ',
  twitchClientId: 'f4ry4d9k0dt89ha8ks7cb845trvbod',
  discordClientId: '559625844197163008',
  paypalClientId: 'AfkLlDPvmM0v1914bih8VN0x0LZps-jkjdz-A7ydiJ0RVPdaAC730VWtVkTWaXZauBYVs3UbaoRHc6VH',
  patreonClientId: 'qXKJ92UNMBtSTV_N0TN47U6l1o2_VXWmqK3u9_Gv3RXIJuiJ0LTpDyzbl5XZuARH',
  get loginRedirect() {
    return environment.baseSite + '/login/';
  },
  get syncRedirect() {
    return environment.baseSite + '/user/settings/sync/';
  },
  get patronApi() {
    return environment.api + '/patreon';
  },
  v2Domain: 'https://v2.oengus.io/',
};
