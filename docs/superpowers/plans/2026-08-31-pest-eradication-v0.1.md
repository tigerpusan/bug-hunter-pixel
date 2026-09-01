# Pest Eradication V0.1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the first installable Android APK shell for 해충 박멸.

**Architecture:** Flutter app shell hosts the validated V0.2.7 HTML game in a local WebView. Home and weapon selection are native Flutter; gameplay stays local/offline for the first APK.

**Tech Stack:** Flutter, Dart, webview_flutter, shared_preferences

**Spec:** `docs/superpowers/specs/2026-08-31-pest-eradication-app-design.md`

## Tasks
- [ ] Scaffold Flutter Android project and merge these source files.
- [ ] Run widget test for title and four weapon choices.
- [ ] Verify local WebView loads `assets/web/game.html` offline.
- [ ] Wire selected weapon to distinct in-game weapon visuals/effects.
- [ ] Add native settings for BGM/SFX/insect sound/high-frequency game effect.
- [ ] Add records screen and persistent best records.
- [ ] Build `flutter build apk --release`.
- [ ] Install/test APK on Android device.
- [ ] Create new GitHub repository after APK validation and add GitHub Actions APK build.
