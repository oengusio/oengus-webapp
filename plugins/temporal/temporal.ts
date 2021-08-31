import { Plugin } from '@nuxt/types';

import { duration } from './duration';

const temporal = {
  duration,
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
