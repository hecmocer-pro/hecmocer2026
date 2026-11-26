import { copyFile, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { assets, sourceFiles } from './site-files.mjs';

const output = join(import.meta.dirname, 'dist');
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const name of sourceFiles) {
  const source = await readFile(join(import.meta.dirname, 'src', name), 'utf8');
  await writeFile(join(output, name), source.replaceAll('../assets/', 'assets/').replaceAll('../AI inspiration/', 'AI inspiration/'));
}

for (const name of assets) {
  const target = join(output, name);
  await mkdir(dirname(target), { recursive: true });
  await copyFile(join(import.meta.dirname, name), target);
}

console.log(`V7 published with ${sourceFiles.length + assets.length} files`);
