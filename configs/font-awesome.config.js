// Font Awesome configuration: https://github.com/nuxt-community/fontawesome-module

function convertToFaList(icons) {
  return icons.map(icon => `fa${icon}`);
}

const solid = [
  'AngleDown',
  'Book',
  'Bug',
  'Bullseye',
  'Calendar',
  'CalendarCheck',
  'CaretDown',
  'CaretRight',
  'Check',
  'CheckSquare',
  'Cogs',
  'Desktop',
  'Donate',
  'DotCircle',
  'Envelope',
  'Home',
  'Language',
  'MoneyBill',
  'PaperPlane',
  'Phone',
  'Plus',
  'Star',
  'Trophy',
  'Tv',
];

const brands = [
  'Discord',
  'FacebookF',
  'Github',
  'Instagram',
  'Patreon',
  'SnapchatGhost',
  'Twitch',
  'Twitter',
];

export function fontAwesomeConfig() {
  return {
    icons: {
      solid: convertToFaList(solid),
      brands: convertToFaList(brands),
    },
  };
}
