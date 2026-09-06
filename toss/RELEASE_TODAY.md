# Bug Hunter Toss Release Checkpoint

Date: 2026-09-06
Branch: `toss/bug-hunter-prep`
Target: Apps in Toss re-upload

## Automated build gates
- Sync canonical `assets/web/game.html` and `assets/game_art/` into the Toss project.
- Build Vite web bundle.
- Build Apps in Toss package with `ait build`.
- Upload `dist` and generated `.ait` output as GitHub Actions artifact `bug-hunter-toss-build`.

## Manual sandbox gates before review submission
- First screen loads normally.
- No Toss navigation / safe-area overlap.
- Sound toggle works.
- Audio stops in background and resumes only when enabled.
- Progress persists after exit and re-entry.

This file is also a release checkpoint used to trigger the Toss CI workflow.
