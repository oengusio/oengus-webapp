// We cannot use any settings that cannot be stringified directly in nuxt.config.js
// https://github.com/nuxt-community/i18n-module/pull/605

import { dateTimeFormats, locales, numberFormats } from './i18n.config';

class WeblateFormatter {
  tokenRegex = /^(?:{{([\w-]+)}}|{([\w-]+)})/;

  interpolate(message, values) {
    if (!values) {
      return [ message ];
    }
    const compiled = [ '' ];
    let index = 0;
    while (index < message.length) {
      const character = message[index];
      if (character === '{') {
        const tokenMatch = this.tokenRegex.exec(message.slice(index));
        if (tokenMatch) {
          const token = tokenMatch[1] ?? tokenMatch[2];
          if (Object.prototype.hasOwnProperty.call(values, token)) {
            compiled.push(values[token], '');
            index += tokenMatch[0].length;
            continue;
          }
        }
      }
      compiled[compiled.length - 1] += character;
      index++;
    }
    return compiled;
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
    numberFormats: locales.reduce((formats, locale) => {
      formats[locale.code] = numberFormats;
      return formats;
    }, { }),
  };
}
