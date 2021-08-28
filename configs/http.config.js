// HTTP configuration: https://http.nuxtjs.org/

export function httpConfig(process) {
  return {
    prefix: '/api/',
    host: process.env.API ?? 'oengus.dev',
    port: 443,
    https: true,
    headers: {
      'oengus-version': 2,
    },
  };
}
