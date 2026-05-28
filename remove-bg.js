const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const input = path.join(__dirname, 'dist/assets/img/logo.png');
const output = path.join(__dirname, 'dist/assets/img/logo-tmp.png');

async function removeBg() {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const pixels = new Uint8Array(data);

  for (let i = 0; i < pixels.length; i += channels) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];

    // Remove branco e o padrão xadrez (branco + cinza claro)
    // Threshold: pixels muito claros (quase brancos/cinzas claros)
    const isLight = r > 200 && g > 200 && b > 200;
    if (isLight) {
      pixels[i + 3] = 0; // alpha = 0 (transparente)
    }
  }

  await sharp(pixels, {
    raw: { width, height, channels }
  })
    .png()
    .toFile(output);

  fs.renameSync(output, input);
  console.log(`Pronto! Fundo removido de ${input}`);
}

removeBg().catch(console.error);
