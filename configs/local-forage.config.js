// Local Forage configuration: https://github.com/nuxt-community/localforage-module

import localforage from 'localforage';

export function localForage() {
  return {
    driver: [
      localforage.INDEXEDDB,
      localforage.LOCALSTORAGE,
    ],
    name: 'oengus',
    storeName: 'oengusLocalForage',
  };
}
