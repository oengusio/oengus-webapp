// We cannot use any settings that cannot be stringified directly in nuxt.config.js
// https://github.com/nuxt-community/i18n-module/pull/605

import { dateTimeFormats, locales } from './i18n.config';

class WeblateFormatter {
  interpolate(message, values) {
    if (!values) {
      return [ message ];
    }
    Object.entries(values).forEach(([ key, value ]) => {
      const replacement = new RegExp(`{?{${key}}}?`, 'gi');
      message = message.replace(replacement, value);
    });
    return [ message ];
  }
};

export default function () {
  return {
    fallbackLocale: 'en-GB',
    formatter: new WeblateFormatter(),
    dateTimeFormats: locales.reduce((formats, locale) => {
      formats[locale.code] = dateTimeFormats;
      return formats;
    }, { }),
  };
}
