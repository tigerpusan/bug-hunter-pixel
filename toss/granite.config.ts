import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  appName: 'bug-hunter',
  brand: {
    displayName: '버그헌터',
    primaryColor: '#1B211D',
    icon: 'https://raw.githubusercontent.com/tigerpusan/bug-hunter-pixel/main/assets/icon/app_icon.png',
  },
  web: {
    host: 'localhost',
    port: 5173,
    commands: {
      dev: 'npm run dev:web',
      build: 'npm run build:web',
    },
  },
  permissions: [],
  outdir: 'dist',
  webViewProps: {
    type: 'game',
    allowsBackForwardNavigationGestures: false,
    overScrollMode: 'never',
  },
});
