export const environment = {
  production: true,
  sandbox: false,
  baseSite: 'https://oengus.io',
  api: 'https://oengus.io/api',
  twitchClientId: 'f4ry4d9k0dt89ha8ks7cb845trvbod',
  loginRedirect: 'https://oengus.io/login/',
  syncRedirect: 'https://oengus.io/user/settings/sync/',
  discordClientId: '559625844197163008',
  paypalClientId: 'AfkLlDPvmM0v1914bih8VN0x0LZps-jkjdz-A7ydiJ0RVPdaAC730VWtVkTWaXZauBYVs3UbaoRHc6VH',
  get patronApi() {
    return environment.api + '/patreon';
  },
};
