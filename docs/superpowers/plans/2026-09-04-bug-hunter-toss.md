# Bug Hunter Toss Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an isolated Apps in Toss WebView build path for BUG HUNTER V1.3.3 while preserving the existing Android build.

**Architecture:** The canonical game remains `assets/web/game.html` plus `assets/game_art/`. A new `toss/` project syncs those files into its Vite build input and packages them with Apps in Toss Web Framework 2.x. A separate GitHub Actions workflow builds the Toss package independently of the existing APK workflow.

**Tech Stack:** Flutter (existing), HTML/CSS/JS game (existing), Node.js 22, Vite 6, TypeScript 5, `@apps-in-toss/web-framework` 2.4.1, GitHub Actions.

**Spec:** `docs/superpowers/specs/2026-09-04-bug-hunter-toss-design.md`

## Global Constraints
- Existing `.github/workflows/build-apk.yml`, Flutter source, and Android release behavior remain unchanged.
- Apps in Toss Web Framework must be 2.x; initial pinned version is `2.4.1`.
- Toss package command is `ait build`.
- `webViewProps.type` must be `game`.
- V1 requests no runtime permissions.
- Bundle must remain below 100 MB uncompressed.
- No ads, login, payments, rankings backend, or external server are introduced.

---

### Task 1: Create isolated Toss WebView project

**Files:**
- Create: `toss/package.json`
- Create: `toss/granite.config.ts`
- Create: `toss/scripts/sync-game.mjs`
- Create: `toss/.gitignore`

**Interfaces:**
- Consumes: `../assets/web/game.html`, `../assets/game_art/`
- Produces: `toss/index.html`, `toss/public/game_art/`, npm scripts `sync`, `dev:web`, `build:web`, `build:toss`

- [ ] **Step 1:** Add package scripts so every dev/build operation runs the sync step first.
- [ ] **Step 2:** Add a sync script using Node `fs.cp`/`copyFile` that replaces generated Toss web inputs from canonical repository assets.
- [ ] **Step 3:** Add Apps in Toss config using `appName: 'bug-hunter'`, display name `버그헌터`, no permissions, `webViewProps.type: 'game'`, Vite port 5173, and `outdir: 'dist'`.
- [ ] **Step 4:** Run `cd toss && npm install && npm run build:web`; expected result is Vite `dist/` output containing the game and artwork.
- [ ] **Step 5:** Commit the isolated Toss scaffold.

### Task 2: Add Toss CI packaging

**Files:**
- Create: `.github/workflows/build-toss.yml`

**Interfaces:**
- Consumes: npm scripts from Task 1.
- Produces: GitHub Actions Toss build artifact.

- [ ] **Step 1:** Configure workflow triggers for changes to `toss/**`, `assets/web/**`, `assets/game_art/**`, and manual dispatch.
- [ ] **Step 2:** Set Node 22 and `working-directory: toss`.
- [ ] **Step 3:** Run `npm install`, `npm run build:web`, then `npm run build:toss`.
- [ ] **Step 4:** Upload `toss/dist/**` and any generated `toss/**/*.ait` files with `if-no-files-found: warn`.
- [ ] **Step 5:** Commit CI workflow.

### Task 3: Toss release-compatibility patch for the game

**Files:**
- Modify: `assets/web/game.html`

**Interfaces:**
- Consumes: existing Web Audio and persistence logic.
- Produces: visible sound toggle; correct background/foreground audio behavior; Safe Area spacing compatible with Toss game navigation.

- [ ] **Step 1:** Add a compact sound On/Off control that does not overlap the top-right Toss navigation controls.
- [ ] **Step 2:** Persist sound preference using the same local persistence strategy as the existing game.
- [ ] **Step 3:** On `visibilitychange` hidden, suspend/stop game audio immediately; on visible, restore only when the saved sound setting is On.
- [ ] **Step 4:** Add CSS top/right spacing so HUD and controls remain outside the Toss close-button/Safe Area region.
- [ ] **Step 5:** Verify the existing campaign, bonus rush, retry, reset, and progress restore still behave identically.
- [ ] **Step 6:** Commit Toss compatibility patch.

### Task 4: Verification and release handoff

**Files:**
- Read: `.github/workflows/build-apk.yml`
- Read: `.github/workflows/build-toss.yml`
- Read: `toss/granite.config.ts`

**Interfaces:**
- Produces: release checklist for Apps in Toss console/Sandbox.

- [ ] **Step 1:** Run the existing Flutter test/build path and verify the Android workflow remains unchanged.
- [ ] **Step 2:** Run `cd toss && npm run build:web` and verify no missing asset requests.
- [ ] **Step 3:** Run `cd toss && npm run build:toss`; expected result is successful Apps in Toss package generation.
- [ ] **Step 4:** Check generated bundle size is below 100 MB uncompressed.
- [ ] **Step 5:** In Toss Sandbox verify: first screen under 10 seconds, navigation X works, no Safe Area overlap, sound toggle works, audio stops on background, progress survives exit/re-entry.
- [ ] **Step 6:** Reconcile `appName` and brand icon URL with exact Apps in Toss console values before review submission.
