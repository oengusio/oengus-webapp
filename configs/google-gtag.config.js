// Google GTag configuration: https://github.com/nuxt-community/google-gtag-module

export function googleGtagConfig() {
  return {
    // "New Style" GA4 Data Stream
    id: 'G-26CN947SSZ',
    config: {
      anonymize_ip: true,
    },
    additionalAccounts: [
      {
        // "Old Style" Web Property
        id: 'UA-153189507-4',
        config: {
          anonymize_ip: true,
        },
      },
    ],
  };
}

export function getGTagIds() {
  const config = googleGtagConfig();
  return [ config.id, ...config.additionalAccounts.map(account => account.id) ];
}
