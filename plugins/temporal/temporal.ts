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

const temporalPlugin: Plugin = ({ i18n }, inject) => {
  // Set the current locale when the plugin is loaded
  temporal.changeLocale(i18n.locale);
  inject('temporal', temporal);
};

declare module 'vue/types/vue' {
  interface Vue {
    $temporal: typeof temporal;
  }
}

export default temporalPlugin;
