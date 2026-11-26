import { once } from 'node:events';
import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join } from 'node:path';
import { assets, sourceFiles } from './site-files.mjs';

const files = new Map([
  ['/', 'src/index.html'],
  ['/projects', 'src/projects.html'],
  ['/projects/', 'src/projects.html'],
  ...sourceFiles.map(name => [`/${name}`, `src/${name}`]),
  ...assets.map(name => [`/${name.replaceAll(' ', '%20')}`, name]),
]);

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.avif': 'image/avif',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.otf': 'font/otf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

const server = createServer(async (request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end();
    return;
  }

  const file = files.get(request.url.split('?')[0]);
  if (!file) {
    response.writeHead(404).end();
    return;
  }

  try {
    const content = await readFile(join(import.meta.dirname, file));
    response.writeHead(200, {
      'Content-Type': types[extname(file)],
      'Cache-Control': 'no-store',
    });
    response.end(request.method === 'HEAD' ? undefined : content);
  } catch (error) {
    response.writeHead(error.code === 'ENOENT' ? 404 : 500).end();
  }
});

const firstPort = Number(process.env.PORT ?? 8000);
if (!Number.isInteger(firstPort) || firstPort < 0 || firstPort > 65535) {
  throw new Error('PORT debe ser un entero entre 0 y 65535');
}

for (let port = firstPort; port <= 65535; port += 1) {
  try {
    await once(server.listen(port, 'localhost'), 'listening');
    break;
  } catch (error) {
    if (error.code !== 'EADDRINUSE' || port === 65535) throw error;
  }
}

console.log(`Portfolio disponible en http://localhost:${server.address().port}/`);
