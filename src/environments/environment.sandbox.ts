export const environment = {
  name: 'sandbox',
  production: true,
  sandbox: true,
  baseSite: 'https://sandbox.oengus.io',
  api: 'https://sandbox.oengus.io/api/v1',
  twitterClientId: 'Z0Zta2JiTjNLQU5iNHlBbGcyLUI6MTpjaQ',
  twitchClientId: 'lsaqyn1omrou7dq2l12m0l865xyjsh',
  discordClientId: '559625844197163008',
  paypalClientId: 'AV9-0fSGWREDWpnMJujrHUbDIibragMgE4-4HuAS-WQPlgHSRyfeU5iqNyiQwLEGZFEKhAiERJdv80a4',
  patreonClientId: 'qXKJ92UNMBtSTV_N0TN47U6l1o2_VXWmqK3u9_Gv3RXIJuiJ0LTpDyzbl5XZuARH',
  get loginRedirect() {
    return environment.baseSite + '/login/';
  },
  get syncRedirect() {
    return environment.baseSite + '/user/settings/sync/';
  },
  get patronApi() {
    return environment.api.replace('/api', '') + '/patreon';
  },
  v2Domain: false,
  donationsDisabled: false,
};
