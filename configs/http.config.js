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

export function getApiUrl(process) {
  const api = process.env.API ?? 'oengus.dev';
  const protocol = api.match(/^localhost(:\d+)?$/) ? 'http' : 'https';
  return `${protocol}://${api}/api/`;
}

export function httpRuntimeConfig(process) {
  return {
    browserBaseURL: getApiUrl(process),
  };
}

export function httpPrivateRuntimeConfig(process) {
  return {
    baseURL: getApiUrl(process),
  };
}
