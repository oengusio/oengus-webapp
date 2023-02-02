// HTTP configuration: https://http.nuxtjs.org/

export function httpConfig() {
  return {
    prefix: '/api/v1/',
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
  const isLocal = api.match(/^localhost(:\d+)?$/);
  const protocol = isLocal ? 'http' : 'https';
  const prefix = isLocal ? '' : '/api';
  return `${protocol}://${api}${prefix}/v1/`;
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
