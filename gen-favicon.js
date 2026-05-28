const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const input = path.join(__dirname, 'IMG/favsemfundo.png');
const tmpFile = path.join(__dirname, 'IMG/favsemfundo-nobg.png');

async function removeBgAndGenerate() {
  // Remove fundo branco
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
    if (r > 220 && g > 220 && b > 220) {
      pixels[i + 3] = 0;
    }
  }

  await sharp(pixels, { raw: { width, height, channels } })
    .png()
    .toFile(tmpFile);

  // Corta o espaço vazio ao redor do leão, depois preenche o quadrado com pequena margem
  const trimmed = path.join(__dirname, 'IMG/favsemfundo-trimmed.png');
  await sharp(tmpFile)
    .trim({ threshold: 10 })
    .extend({ top: 20, bottom: 20, left: 20, right: 20, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(trimmed);

  // Gera favicon-tab.png em 512x512 preenchendo bem o espaço
  await sharp(trimmed)
    .resize(512, 512, { fit: 'cover', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(__dirname, 'dist/assets/img/favicon-tab.png'));

  // Gera favicon.png em 32x32
  await sharp(trimmed)
    .resize(32, 32, { fit: 'cover', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(__dirname, 'dist/assets/img/favicon.png'));

  fs.unlinkSync(trimmed);

  fs.unlinkSync(tmpFile);
  console.log('Favicons gerados com sucesso!');
}

removeBgAndGenerate().catch(console.error);
