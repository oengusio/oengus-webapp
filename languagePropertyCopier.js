// Simple script that helps me copy translations and save our translators some time if I'm just copying.

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, 'src', 'assets', 'i18n');
const jsonFiles = fs.readdirSync(rootDir).filter((file) => file.endsWith('.json'));

for (const file of jsonFiles) {
  const filePath = path.resolve(rootDir, file);
  const json = fs.readFileSync(filePath, 'utf8');
  const obj = JSON.parse(json);

  if (obj?.marathon?.settings?.twitch?.error?.max) {
    obj.marathon.settings.twitch.error.maxlength = obj.marathon.settings.twitch.error.max;

    delete obj.marathon.settings.twitch.error.max;
  }

  if (obj?.marathon?.settings?.bluesky?.error?.max) {
    obj.marathon.settings.bluesky.error.maxlength = obj.marathon.settings.bluesky.error.max;

    delete obj.marathon.settings.bluesky.error.max;
  }

  // if (obj.navbar?.login?.discord) {
  //   obj.login = { ...obj.login };
  //   obj.login.provider = {...obj.login.provider };
  //
  //   obj.login.provider.discord = obj.navbar.login.discord;
  // }
  //
  // if (obj.navbar?.login?.twitch) {
  //   obj.login = { ...obj.login };
  //   obj.login.provider = {...obj.login.provider };
  //
  //   obj.login.provider.twitch = obj.navbar.login.twitch;
  // }
  //
  // if (obj.navbar?.login?.google) {
  //   obj.login = { ...obj.login };
  //   obj.login.provider = {...obj.login.provider };
  //
  //   obj.login.provider.google = obj.navbar.login.google;
  // }

  fs.writeFileSync(filePath, JSON.stringify(obj, null, 2));
}
