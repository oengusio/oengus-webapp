import { Plugin } from '@nuxt/types';

import { distance } from './distance';
import { duration } from './duration';

const temporal = {
  distance,
  duration,
  timeZone,
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
