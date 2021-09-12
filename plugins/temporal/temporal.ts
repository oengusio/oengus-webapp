import { Plugin } from '@nuxt/types';

import { distance } from './distance';
import { duration } from './duration';
import { timeZone } from './time-zone';

const temporal = {
  distance,
  duration,
  timeZone,
  changeLocale(locale: string): void {
    this.distance.changeLocale(locale);
  },
};

const temporalPlugin: Plugin = (_, inject) => {
  inject('temporal', temporal);
};

declare module 'vue/types/vue' {
  interface Vue {
    $temporal: typeof temporal;
  }
}

export default temporalPlugin;
