export const environment = {
  production: true,
  sandbox: true,
  baseSite: 'https://sandbox.oengus.io',
  api: 'https://sandbox.oengus.io/api',
  twitchClientId: 'f4ry4d9k0dt89ha8ks7cb845trvbod',
  loginRedirect: 'https://sandbox.oengus.io/login/',
  syncRedirect: 'https://sandbox.oengus.io/user/settings/sync/',
  discordClientId: '559625844197163008',
  paypalClientId: 'AV9-0fSGWREDWpnMJujrHUbDIibragMgE4-4HuAS-WQPlgHSRyfeU5iqNyiQwLEGZFEKhAiERJdv80a4',
  patreonClientId: 'qXKJ92UNMBtSTV_N0TN47U6l1o2_VXWmqK3u9_Gv3RXIJuiJ0LTpDyzbl5XZuARH',
  get patronApi() {
    return environment.api + '/patreon';
  },
};
