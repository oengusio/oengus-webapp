export const environment = {
  production: true,
  sandbox: true,
  baseSite: 'https://sandbox.oengus.io',
  api: 'https://sandbox.oengus.io/api',
  twitchClientId: 'yvlsv2i2pf9euy7jy9rarqlnlccagn',
  loginRedirect: 'https://sandbox.oengus.io/login/',
  syncRedirect: 'https://sandbox.oengus.io/user/settings/sync/',
  discordClientId: '559625844197163008',
  paypalClientId: 'AV9-0fSGWREDWpnMJujrHUbDIibragMgE4-4HuAS-WQPlgHSRyfeU5iqNyiQwLEGZFEKhAiERJdv80a4',
  get patronApi() {
    return environment.api + '/patreon';
  },
};
