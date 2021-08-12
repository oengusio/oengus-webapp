import { cacheConfig } from './configs/cache.config';
import { fontAwesomeConfig } from './configs/font-awesome.config';
import { googleGtagConfig } from './configs/googe-gtag.config';
import { httpConfig } from './configs/http.config';
import { i18nConfig } from './configs/i18n.config';
import { momentConfig } from './configs/moment.config';
import { robotsConfig } from './configs/robots.config';
import { sitemapConfig } from './configs/sitemap.config';

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  'head': {
    title: 'Oengus v2',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  'css': [
    '~assets/global',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  'plugins': [
    { src: '~/plugins/google-gtag.client.ts', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  'components': true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  'buildModules': [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://github.com/nuxt-community/fontawesome-module
    '@nuxtjs/fontawesome',
    // https://github.com/nuxt-community/moment-module
    '@nuxtjs/moment',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  'modules': [
    '@nuxt/http',
    '@nuxtjs/google-gtag',
    '@nuxtjs/robots',
    'nuxt-i18n',
    'nuxt-ssr-cache',
    // sitemap should always come last
    '@nuxtjs/sitemap',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  'build': {
    babel: {
      presets() {
        return [ [ '@nuxt/babel-preset-app', { corejs: { version: 3 } } ] ];
      },
    },
  },

  // HTTP configuration: https://http.nuxtjs.org/
  'http': httpConfig(process),

  // Font Awesome configuration: https://github.com/nuxt-community/fontawesome-module
  'fontawesome': fontAwesomeConfig(process),

  // Google GTag configuration: https://github.com/nuxt-community/google-gtag-module
  'google-gtag': googleGtagConfig(process),

  // Moment configuration: https://github.com/nuxt-community/moment-module
  'moment': momentConfig(process),

  // robots configuration: https://github.com/nuxt-community/robots-module
  // Provides an automated /robots.txt
  'robots': robotsConfig(process),

  // i18n configuration: https://i18n.nuxtjs.org/
  'i18n': i18nConfig(process),

  // SSR Cache configuration: https://www.npmjs.com/package/nuxt-ssr-cache
  'cache': cacheConfig(process),

  // Sitemap configuration: https://sitemap.nuxtjs.org/
  // Provides an automated /sitemap.xml
  'sitemap': sitemapConfig(process),
};
