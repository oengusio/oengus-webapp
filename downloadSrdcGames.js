// Quick script to download consoles from srdc

const https = require('https');
const fs = require('fs');

const base = 'https://www.speedrun.com/api/v1/platforms?max=200';

async function fetchWithOffset(offset) {
  return new Promise((resolve, reject) => {

    https.get(`${base}&offset=${offset}`, (res) => {
      let data = [];

      res.on('data', chunk => {
        data.push(chunk);
      });

      res.on('end', () => {
        console.log('Response ended: ');
        const jsonData = JSON.parse(Buffer.concat(data).toString());

        resolve(jsonData.data.map(it => it.name));

      });
    }).on('error', (e) => reject(e));

  })
}

const toFix = {
  '2DS': 'Nintendo 2DS',
  '2DS Backwards Compatibility': 'Nintendo 2DS Backwards Compatibility',
  '2DS XL': 'Nintendo 2DS XL',
  '3DS Backwards Compatibility': 'Nintendo 3DS Backwards Compatibility',
}

function fixName(name) {
  if (name in toFix) {
    return toFix[name];
  }

  return name;
}

async function main() {
  let offset = 0;
  let lastData = [];
  const customConsoles = [
    // Custom "consoles" that are not actually consoles
    'N/A',
    'Other'
  ]
  let totalData = [];

  do {
    lastData = await fetchWithOffset(offset);

    console.log(lastData);

    totalData.push(...lastData.map(fixName));

    offset += 200;
  } while (lastData.length > 0);

  const sortedData = totalData.sort((a,b) => a.localeCompare(b));

  customConsoles.push(...sortedData);

  fs.writeFileSync('./src/assets/consoles.json', JSON.stringify(
    customConsoles,
    null, 2)
  );
}

main();
