# Bug Hunter Toss Release Design

## Goal
Prepare BUG HUNTER V1.3.3 for Apps in Toss without changing the existing Android/Flutter release path.

## Current baseline
- Repository: `tigerpusan/bug-hunter-pixel`
- Baseline commit: `e230d4667c23714131ae6c1c45db0519ad79dbf8`
- Flutter version metadata: `1.3.3+133`
- Game implementation: `assets/web/game.html`
- Android build workflow: `.github/workflows/build-apk.yml`

## Architecture
Keep the existing Flutter wrapper and Android build untouched. Add a standalone `toss/` WebView project that reuses the same HTML game and referenced artwork. The Toss project uses `@apps-in-toss/web-framework` 2.x, Vite, `granite.config.ts`, and `ait build`.

The Toss build copies the canonical game HTML and game artwork from the repository root into `toss/public/` before Vite/ait packaging. This avoids maintaining a second game implementation.

## Repository layout

```text
bug-hunter-pixel/
├─ assets/
│  ├─ web/game.html              # canonical game source
│  ├─ game_art/                  # canonical art
│  └─ icon/app_icon.png
├─ lib/                          # existing Flutter wrapper
├─ pubspec.yaml                  # existing Android metadata
├─ .github/workflows/
│  ├─ build-apk.yml              # unchanged
│  └─ build-toss.yml             # new Toss CI
└─ toss/
   ├─ package.json
   ├─ granite.config.ts
   ├─ index.html
   ├─ scripts/sync-game.mjs
   └─ public/
```

## Toss requirements
- WebView mini-app.
- `webViewProps.type` is `game`.
- Apps in Toss Web Framework 2.x.
- Toss build command is `ait build`.
- No runtime permissions are requested for V1.
- Existing game remains portrait/fullscreen.
- The bundle must stay under the Apps in Toss 100 MB uncompressed limit.
- The game must show the Toss game navigation bar and avoid its close button/Safe Area.
- Audio must be user-controllable and stop immediately when the mini-app enters background; resume correctly when returning if audio is enabled.
- Existing campaign/progress data must continue to persist.
- No ads, login, payments, ranking server, or external backend are added in this first Toss release.

## Configuration strategy
`granite.config.ts` uses the intended console app ID `bug-hunter` as the initial value and `버그헌터` as display name. Before final review submission, these values must be reconciled with the exact Apps in Toss console values if the console assigns or requires a different app ID/icon URL.

## CI strategy
Add `.github/workflows/build-toss.yml` with these gates:
1. checkout
2. Node 22 setup
3. install Toss dependencies
4. sync canonical game/assets into Toss public directory
5. build Vite web output
6. run `ait build`
7. upload Toss build artifacts

This workflow is independent from `build-apk.yml`, so Android production output cannot be broken by Toss-specific changes.

## Release readiness gates
A Toss release candidate is ready only when:
- `npm run sync` succeeds.
- `npm run build:web` succeeds.
- `npm run build:toss` succeeds.
- game loads within Toss Sandbox.
- sound toggle works.
- background/foreground sound behavior passes.
- progress persists after exit/re-entry.
- no controls overlap Toss Safe Area / close button.
- initial screen loads within 10 seconds.

## Follow-up after Bug Hunter
Use this Toss structure as the template for `문대작전`; only app metadata and canonical game assets should differ.