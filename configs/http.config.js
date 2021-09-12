// HTTP configuration: https://http.nuxtjs.org/

export function httpConfig() {
  return {
    prefix: '/api/',
    host: 'oengus.dev',
    port: 443,
    https: true,
    headers: {
      'oengus-version': 2,
    },
  };
}

export function httpRuntimeConfig(process) {
  return {
    browserBaseURL: `https://${process.env.API ?? 'oengus.dev'}/api/`,
  };
}

export function httpPrivateRuntimeConfig(process) {
  return {
    baseURL: `https://${process.env.API ?? 'oengus.dev'}/api/`,
  };
}
