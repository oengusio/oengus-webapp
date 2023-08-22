// I am not even sorry - duncte
export const puns = [
  'Moo-ve Fast: Secure Your Oengus T-Shirt Today!',
  'Udderly Stylish: Pre-order Your Cow-tastic Oengus Tee!',
  'Get Grazing: Pre-order Your Oengus Tee Now!',
  'Don\'t Miss the Herd: Reserve Your Oengus T-Shirt!',
  'Milk the Moment: Pre-order Your Oengus Cow Print Tee!',
  'Steer into Fashion: Pre-order Your Oengus Cow Tee!',
  'Herd It Here First: Reserve Your Oengus T-Shirt!',
  'Cows and Wow: Pre-order Your Oengus Print Tee!',
  'Farm Fresh Fashion: Secure Your Oengus T-Shirt!',
  'Moo-la-la: Pre-order Your Trendy Oengus Tee!',
  'Strut with the Steers: Pre-order Your Oengus Tee!',
  'Grass to Gorgeous: Reserve Your Oengus T-Shirt Today!',
  'Cud-n\'t Resist: Pre-order Your Oengus Print Tee!',
  'Stylishly Pasture Prime: Secure Your Oengus T-Shirt!',
  'Pre-moo-ium Fashion: Get Your Oengus Tee Now!',
];

export function getRandomPun(): string {
  return puns[Math.floor(Math.random() * puns.length)];
}
