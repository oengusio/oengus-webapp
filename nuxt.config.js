const locales = [
  { code: 'ca', iso: 'ca', file: 'ca.json' },
  { code: 'cy', iso: 'cy', file: 'cy.json' },
  { code: 'da', iso: 'da', file: 'da.json' },
  { code: 'de', iso: 'de', file: 'de.json' },
  { code: 'el', iso: 'el', file: 'el.json' },
  { code: 'en', iso: 'en', file: 'en.json' },
  { code: 'es', iso: 'es', file: 'es.json' },
  { code: 'fi', iso: 'fi', file: 'fi.json' },
  { code: 'fr', iso: 'fr', file: 'fr.json' },
  { code: 'it', iso: 'it', file: 'it.json' },
  { code: 'ja', iso: 'ja', file: 'ja.json' },
  { code: 'ko', iso: 'ko', file: 'ko.json' },
  { code: 'nb_NO', iso: 'nb-NO', file: 'nb_NO.json' },
  { code: 'nl', iso: 'nl', file: 'nl.json' },
  { code: 'pt_BR', iso: 'pt-BR', file: 'pt_BR.json' },
  { code: 'ru', iso: 'ru', file: 'ru.json' },
  { code: 'tr', iso: 'tr', file: 'tr.json' },
  { code: 'zh_Hans', iso: 'zh', file: 'zh_Hans.json' },
  { code: 'zh_Hant_HK', iso: 'zh-HK', file: 'zh_Hant_HK.json' },
];

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'oengus-webapp',
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
  css: [
    '~assets/global',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-i18n',
    // sitemap should always come last
    '@nuxtjs/sitemap',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  // i18n configuration: https://i18n.nuxtjs.org/
  i18n: {
    locales,
    defaultLocale: 'en',
    strategy: 'prefix',
    detectBrowserLanguage: false,
    langDir: '~/locales/',
    lazy: true,
    vueI18n: {
      fallbackLocale: 'en',
    },
  },

  // Sitemap configuration: https://sitemap.nuxtjs.org/
  sitemap: {
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
