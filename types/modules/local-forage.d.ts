import type localforage from 'localforage';

declare module 'vue/types/vue' {
  interface Vue {
    $localForage: typeof localforage;
  }
}

declare module '@nuxt/types' {
  interface Context {
    $localForage: typeof localforage;
  }
}
