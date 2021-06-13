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
    '@nuxtjs/sitemap', // This item always last
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  // i18n configuration: https://i18n.nuxtjs.org/
  i18n: {
    locales: [
      { code: 'ca', file: 'ca.json' },
      { code: 'cy', file: 'cy.json' },
      { code: 'da', file: 'da.json' },
      { code: 'de', file: 'de.json' },
      { code: 'el', file: 'el.json' },
      { code: 'en', file: 'en.json' },
      { code: 'fi', file: 'fi.json' },
      { code: 'fr', file: 'fr.json' },
      { code: 'it', file: 'it.json' },
      { code: 'ja', file: 'ja.json' },
      { code: 'ko', file: 'ko.json' },
      { code: 'nb_NO', file: 'nb_NO.json' },
      { code: 'nl', file: 'nl.json' },
      { code: 'pt_BR', file: 'pt_BR.json' },
      { code: 'ru', file: 'ru.json' },
      { code: 'tr', file: 'tr.json' },
      { code: 'zh_Hans', file: 'zh_Hans.json' },
      { code: 'zh_Hant_HK', file: 'zh_Hant_HK.json' },
    ],
    defaultLocale: 'en',
    strategy: 'no_prefix',
    langDir: '~/locales/',
    lazy: true,
    vueI18n: {
      fallbackLocale: 'en',
    },
  },

  // Sitemap configuration: https://sitemap.nuxtjs.org/
  sitemap: {
    hostname: 'https://v2.oengus.dev',
    exclude: [
      '/user/settings',
      '/user/settings/**',
    ],
  },
};
