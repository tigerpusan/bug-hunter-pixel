import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
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

const tossHeadPatch = `
<style id="toss-compat-style">
  :root {
    --toss-safe-top: env(safe-area-inset-top, 0px);
    --toss-safe-right: env(safe-area-inset-right, 0px);
    --toss-safe-bottom: env(safe-area-inset-bottom, 0px);
    --toss-safe-left: env(safe-area-inset-left, 0px);
  }
  #hud {
    top: calc(8px + var(--toss-safe-top));
    right: calc(64px + var(--toss-safe-right));
    left: calc(8px + var(--toss-safe-left));
  }
  #tossSoundToggle {
    position: fixed;
    left: calc(10px + var(--toss-safe-left));
    top: calc(78px + var(--toss-safe-top));
    z-index: 95;
    border: 2px solid #0a0d0b;
    background: #172018;
    color: #fff;
    padding: 7px 10px;
    font: 800 12px/1 ui-monospace, "SFMono-Regular", Consolas, "Noto Sans KR", monospace;
    box-shadow: 3px 3px 0 rgba(0,0,0,.35);
  }
</style>`;

const tossBodyPatch = `
<script id="toss-compat-script">
(function () {
  const SOUND_KEY = 'bug_hunter_toss_sound';
  let soundEnabled = localStorage.getItem(SOUND_KEY) !== 'off';

  const originalEnsureAudio = typeof ensureAudio === 'function' ? ensureAudio : null;
  const originalPing = typeof ping === 'function' ? ping : null;
  const originalNoiseBurst = typeof noiseBurst === 'function' ? noiseBurst : null;

  if (originalEnsureAudio) {
    ensureAudio = function () {
      if (!soundEnabled) return;
      return originalEnsureAudio();
    };
  }
  if (originalPing) {
    ping = function (...args) {
      if (!soundEnabled) return;
      return originalPing(...args);
    };
  }
  if (originalNoiseBurst) {
    noiseBurst = function (...args) {
      if (!soundEnabled) return;
      return originalNoiseBurst(...args);
    };
  }

  const button = document.createElement('button');
  button.id = 'tossSoundToggle';
  button.type = 'button';

  function render() {
    button.textContent = soundEnabled ? '🔊 소리 ON' : '🔇 소리 OFF';
    button.setAttribute('aria-pressed', String(soundEnabled));
  }

  async function applyAudioState() {
    try {
      if (!audioCtx) return;
      if (!soundEnabled && audioCtx.state === 'running') await audioCtx.suspend();
      if (soundEnabled && document.visibilityState === 'visible' && audioCtx.state === 'suspended') await audioCtx.resume();
    } catch (_) {}
  }

  button.addEventListener('click', async function (event) {
    event.stopPropagation();
    soundEnabled = !soundEnabled;
    localStorage.setItem(SOUND_KEY, soundEnabled ? 'on' : 'off');
    render();
    await applyAudioState();
  });

  document.addEventListener('visibilitychange', async function () {
    try {
      if (!audioCtx) return;
      if (document.visibilityState === 'hidden' && audioCtx.state === 'running') {
        await audioCtx.suspend();
      } else if (document.visibilityState === 'visible' && soundEnabled && audioCtx.state === 'suspended') {
        await audioCtx.resume();
      }
    } catch (_) {}
  });

  render();
  document.body.appendChild(button);
  applyAudioState();
})();
</script>`;

await mkdir(targetPublic, { recursive: true });
await rm(targetArt, { recursive: true, force: true });

let html = await readFile(sourceHtml, 'utf8');
html = html.replace('</head>', `${tossHeadPatch}\n</head>`);
html = html.replace('</body>', `${tossBodyPatch}\n</body>`);
await writeFile(targetHtml, html, 'utf8');

await cp(sourceArt, targetArt, { recursive: true });

console.log('Synced canonical Bug Hunter game into toss/ with Toss compatibility layer');
