import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const tossRoot = resolve(here, '..');
const html = await readFile(resolve(tossRoot, 'index.html'), 'utf8');

const expected = '#banner {\n    top: calc(80px + var(--toss-safe-top));\n  }';

if (!html.includes(expected)) {
  console.error('FAIL: Toss banner is not offset by safe-area inset.');
  process.exit(1);
}

console.log('PASS: Toss banner safe-area offset is present.');
