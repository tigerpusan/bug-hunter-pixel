import { cp, copyFile, mkdir, rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const tossRoot = resolve(here, '..');
const repoRoot = resolve(tossRoot, '..');

const sourceHtml = resolve(repoRoot, 'assets/web/game.html');
const sourceArt = resolve(repoRoot, 'assets/game_art');
const targetHtml = resolve(tossRoot, 'index.html');
const targetPublic = resolve(tossRoot, 'public');
const targetArt = resolve(targetPublic, 'game_art');

await mkdir(targetPublic, { recursive: true });
await rm(targetArt, { recursive: true, force: true });
await copyFile(sourceHtml, targetHtml);
await cp(sourceArt, targetArt, { recursive: true });

console.log('Synced canonical Bug Hunter game into toss/');
