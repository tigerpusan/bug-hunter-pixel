import {
  loadFullScreenAd,
  showFullScreenAd,
} from '@apps-in-toss/web-framework';

const LIVE_REWARDED_ID = 'ait.v2.live.99834705b15c4eb1';
const TEST_REWARDED_ID = 'ait-ad-test-rewarded-id';

const params = new URLSearchParams(window.location.search);
const useTestAd = import.meta.env.DEV || params.get('adtest') === '1';
const adGroupId = useTestAd ? TEST_REWARDED_ID : LIVE_REWARDED_ID;

let loaded = false;
let loadPromise = null;

function supported() {
  try {
    return loadFullScreenAd.isSupported() && showFullScreenAd.isSupported();
  } catch (_) {
    return false;
  }
}

function preload() {
  if (loaded) return Promise.resolve(true);
  if (loadPromise) return loadPromise;
  if (!supported()) return Promise.resolve(false);

  loadPromise = new Promise((resolve) => {
    let settled = false;
    let cleanup = () => {};
    const timer = window.setTimeout(() => finish(false), 12000);

    function finish(ok) {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      try { cleanup(); } catch (_) {}
      loaded = ok;
      loadPromise = null;
      resolve(ok);
    }

    try {
      cleanup = loadFullScreenAd({
        options: { adGroupId },
        onEvent: (event) => {
          if (event.type === 'loaded') finish(true);
        },
        onError: () => finish(false),
      });
    } catch (_) {
      finish(false);
    }
  });

  return loadPromise;
}

async function showRewarded() {
  const ready = await preload();
  if (!ready) return false;

  loaded = false;

  return new Promise((resolve) => {
    let settled = false;
    let earnedReward = false;
    let cleanup = () => {};
    const timer = window.setTimeout(() => finish(false), 90000);

    function finish(ok) {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      try { cleanup(); } catch (_) {}
      window.setTimeout(() => { preload(); }, 400);
      resolve(ok);
    }

    try {
      cleanup = showFullScreenAd({
        options: { adGroupId },
        onEvent: (event) => {
          switch (event.type) {
            case 'userEarnedReward':
              earnedReward = true;
              break;
            case 'dismissed':
              finish(earnedReward);
              break;
            case 'failedToShow':
              finish(false);
              break;
          }
        },
        onError: () => finish(false),
      });
    } catch (_) {
      finish(false);
    }
  });
}

window.BugHunterTossAds = {
  adGroupId,
  liveAdGroupId: LIVE_REWARDED_ID,
  testAdGroupId: TEST_REWARDED_ID,
  isTestAd: useTestAd,
  preload,
  showRewarded,
};

window.dispatchEvent(new Event('bugHunterAdsReady'));
preload();
