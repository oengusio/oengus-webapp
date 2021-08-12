// HTTP configuration: https://http.nuxtjs.org/

export function httpConfig() {
  return {
    prefix: '/api/',
    host: 'oengus.dev',
    port: 443,
    https: true,
    headers: {
      // Temporarily removed pending update of API to accept over CORS
      'oengus-version': 2,
    },
  };
}
