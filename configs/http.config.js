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

// These are wrapped in IF in case someone override the values above on purpose (see config)

export function httpRuntimeConfig(process) {
  if (process.env.API) {
    return {
      browserBaseURL: `https://${process.env.API}/api/`,
    };
  }
  return undefined;
}

export function httpPrivateRuntimeConfig(process) {
  if (process.env.API) {
    return {
      baseURL: `https://${process.env.API}/api/`,
    };
  }
  return undefined;
}
