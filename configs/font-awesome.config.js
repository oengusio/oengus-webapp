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
  'Home',
  'Language',
  'MoneyBill',
  'PaperPlane',
  'Plus',
];

const brands = [
  'Discord',
  'Github',
  'Patreon',
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