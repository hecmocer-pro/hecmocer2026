import { copyFile, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const output = join(import.meta.dirname, 'dist');
const pages = ['index.html', 'bootstrap.js', 'cards.css', 'styles.css', 'v6.css', 'script.js', 'cards.js', 'v6.js', 'preferences.js'];
const assets = [
  'assets/h-logo-circle.png',
  'assets/profile-v7.webp',
  'assets/mtg-background-v7.webp',
  'assets/pkm-background-v7.webp',
  'assets/hearthstone-background.avif',
  'assets/pkm-electric.png',
  'assets/pkm-dragon.png',
  'assets/pkm-normal.webp',
  'assets/fonts/beleren/Beleren2016-Bold.woff',
  'assets/fonts/beleren/Beleren2016SmallCaps-Bold.woff',
  'assets/fonts/beleren/balatro.otf.woff2',
  'assets/fonts/d-din/D-DIN.otf',
  'assets/fonts/d-din/D-DIN-Bold.otf',
  'AI inspiration/W.svg',
  'AI inspiration/U.svg',
  'AI inspiration/R.svg',
  'AI inspiration/G.svg',
  'AI inspiration/hearthstone-card-2.png',
];

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const name of pages) {
  const source = await readFile(join(import.meta.dirname, 'V7', name), 'utf8');
  await writeFile(join(output, name), source.replaceAll('../assets/', 'assets/').replaceAll('../AI inspiration/', 'AI inspiration/'));
}

for (const name of assets) {
  const target = join(output, name);
  await mkdir(dirname(target), { recursive: true });
  await copyFile(join(import.meta.dirname, name), target);
}

console.log(`V7 published at / with ${pages.length + assets.length} files`);
