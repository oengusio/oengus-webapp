// We use locales in multiple places, so it's easiest to abstract
const locales = [
  { code: 'ca', iso: 'ca', file: 'ca.json', nativeName: 'Català' },
  { code: 'cy', iso: 'cy', file: 'cy.json', nativeName: 'Cymraeg' },
  { code: 'da', iso: 'da', file: 'da.json', nativeName: 'dansk' },
  { code: 'de', iso: 'de', file: 'de.json', nativeName: 'Deutsch' },
  { code: 'el', iso: 'el', file: 'el.json', nativeName: 'Ελληνικά' },
  { code: 'en', iso: 'en', file: 'en.json', nativeName: 'English' },
  { code: 'es', iso: 'es', file: 'es.json', nativeName: 'español' },
  { code: 'fi', iso: 'fi', file: 'fi.json', nativeName: 'suomi' },
  { code: 'fr', iso: 'fr', file: 'fr.json', nativeName: 'français' },
  { code: 'it', iso: 'it', file: 'it.json', nativeName: 'Italiano' },
  { code: 'ja', iso: 'ja', file: 'ja.json', nativeName: '日本語' },
  { code: 'ko', iso: 'ko', file: 'ko.json', nativeName: '한국어 (韓國語)' },
  { code: 'nb_NO', iso: 'nb-NO', momentIso: 'nb', file: 'nb_NO.json', nativeName: 'Norsk bokmål' },
  { code: 'nl', iso: 'nl', file: 'nl.json', nativeName: 'Nederlands' },
  { code: 'pt_BR', iso: 'pt-BR', file: 'pt_BR.json', nativeName: 'Português (Brazil)' },
  { code: 'ru', iso: 'ru', file: 'ru.json', nativeName: 'русский язык' },
  { code: 'tr', iso: 'tr', file: 'tr.json', nativeName: 'Türkçe' },
  { code: 'zh_Hans', iso: 'zh', momentIso: 'zh-CN', file: 'zh_Hans.json', nativeName: '中文 (简体中文)' },
  { code: 'zh_Hant_HK', iso: 'zh-HK', file: 'zh_Hant_HK.json', nativeName: '中文 (香港)' },
];

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
  'http': {
    prefix: '/api/',
    host: 'oengus.dev',
    port: 443,
    https: true,
    headers: {
      // Temporarily removed pending update of API to accept over CORS
      'oengus-version': 2,
    },
  },

  // Font Awesome configuration: https://github.com/nuxt-community/fontawesome-module
  'fontawesome': {
    icons: {
      solid: [
        'faAngleDown',
        'faBug',
        'faCheck',
        'faLanguage',
      ],
      brands: [
        'faDiscord',
        'faGithub',
        'faPatreon',
        'faTwitch',
        'faTwitter',
      ],
    },
  },

  // Google GTag configuration: https://github.com/nuxt-community/google-gtag-module
  'google-gtag': {
    // "New Style" GA4 Data Stream
    id: 'G-26CN947SSZ',
    additionalAccounts: [
      {
        // "Old Style" Web Property
        id: 'UA-153189507-4',
      },
    ],
  },

  // Moment configuration: https://github.com/nuxt-community/moment-module
  'moment': {
    defaultLocale: 'en',
    locales: locales
      // You're not ALLOWED to specify 'en' even though it is always included
      .filter(locale => locale.iso !== 'en')
      .map(locale => (locale.momentIso ?? locale.iso).toLocaleLowerCase()),
    timezone: true,
  },

  // robots configuration: https://github.com/nuxt-community/robots-module
  // Provides an automated /robots.txt
  'robots': {
    UserAgent: '*',
    Disallow: [
      'login/',
      // Disallow both the page and directory
      'user/settings',
      'user/settings/',
    ].reduce((rules, page) => rules.concat(locales.map(locale => `/${locale.code}/${page}`)), []),
    // TODO Should be a dynamically bound URL to be fed through ENV
    Sitemap: 'https://v2.oengus.dev/sitemap.xml',
  },

  // i18n configuration: https://i18n.nuxtjs.org/
  'i18n': {
    locales,
    defaultLocale: 'en',
    strategy: 'prefix',
    detectBrowserLanguage: false,
    langDir: '~/locales/',
    lazy: true,
    vueI18n: '~/vue-i18n.config.js',
    // Performant language-based SEO: https://i18n.nuxtjs.org/seo#improving-performance
    seo: false,
  },

  // SSR Cache configuration: https://www.npmjs.com/package/nuxt-ssr-cache
  'cache': {
    useHostPrefix: false,
    pages: [ '/' ],
    // The default key function contains a bug that sometimes causes it to fail
    key(route) {
      return route;
    },
    store: {
      type: 'multi',
      stores: [
        {
          // Uses an in-memory LRU caching strategy.
          // For present time, covers all caching, but eventually this should
          // handle a "massively used" cache with a short timeout and capacity.
          type: 'memory',
          max: 100,
          // Five minutes
          ttl: process.env.NODE_ENV === 'production' ? 5 * 60 : 5,
        },
        // Will not let us specify a TTL and so cache is immortal.
        // Improvements or replacements will have to occur.
        // {
        //   type: 'memcached',
        //   options: {
        //     hosts: [ process.env.CACHE_HOST ],
        //   },
        // },
      ],
    },
  },

  // Sitemap configuration: https://sitemap.nuxtjs.org/
  // Provides an automated /sitemap.xml
  'sitemap': {
    hostname: 'https://v2.oengus.dev',
    i18n: {
      locales,
    },
    exclude: [
      '/user/settings',
      '/user/settings/**',
    ],
  },
};
