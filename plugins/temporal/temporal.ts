import { Plugin } from '@nuxt/types';

import { distance } from './distance';
import { duration } from './duration';
import { range } from './range';
import { timeZone } from './time-zone';

const temporal = {
  distance,
  duration,
  timeZone,
  range,
  changeLocale(locale: string): void {
    this.distance.changeLocale(locale);
    this.range.changeLocale(locale);
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
