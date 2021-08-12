// Google GTag configuration: https://github.com/nuxt-community/google-gtag-module

export function googleGtagConfig() {
  return {
    // "New Style" GA4 Data Stream
    id: 'G-26CN947SSZ',
    additionalAccounts: [
      {
        // "Old Style" Web Property
        id: 'UA-153189507-4',
      },
    ],
  };
}
