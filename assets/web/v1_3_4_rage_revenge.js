// BUG HUNTER V1.3.4 - RAGE REVENGE overlay patch
// Loaded after assets/web/game.html by the Flutter host.
(() => {
  const REWARD_AD_GROUP_ID = 'ait.v2.live.99834705b15c4eb1';
  const REWARD_AD_TEST_ID = 'ait-ad-test-rewarded-id';
  let pendingRevenge = false;
  let pendingRevengeWave = 1;

  function pestFailName(meta) {
    if (meta.endless || meta.act.key === 'mixed') return '해충떼';
    return meta.act.name;
  }

  const originalOpenResult = openResult;
  openResult = function(success, message) {
    originalOpenResult(success, message);
    if (!success) {
      ovIcon.textContent = '💥';
      ovTitle.textContent = '아... 아쉽게 실패!';
      ovText.textContent = message;
      retryBtn.textContent = '다시하기';
      resetBtn.textContent = '복수하기';
      resetBtn.dataset.action = 'revenge';
    } else {
      resetBtn.dataset.action = 'reset';
    }
  };

  failStage = function(_reason) {
    playFail();
    rememberProgress();
    const meta = actOf(wave);
    const retryWave = meta.endless
      ? Math.max(TOTAL_CAMPAIGN_STAGES + 1, wave - 2)
      : Math.max(1, wave - 2);

    pendingRevengeWave = wave;
    persistProgress(wave, score);
    overlay.dataset.retryWave = String(retryWave);
    overlay.dataset.currentWave = String(wave);
    overlay.dataset.campaignCrown = '0';
    openResult(false, 'MISS 3회. ' + pestFailName(meta) + '에게 털렸습니다.');
  };

  function showCampaignCrown() {
    transitioning = true;
    running = false;
    stopTimer();
    overlay.style.display = 'flex';
    ovCard.classList.remove('fail');
    ovIcon.textContent = '🎉';
    ovTitle.textContent = '축하합니다!';
    ovText.textContent = '해충박멸왕이 되셨습니다.';
    retryBtn.textContent = '무한 혼합 도전';
    resetBtn.textContent = '처음부터';
    resetBtn.dataset.action = 'reset';
    overlay.dataset.campaignCrown = '1';
  }

  nextStage = function() {
    rememberProgress();
    const meta = actOf(wave);
    if (!meta.endless && meta.act.key !== 'mixed' && meta.level === meta.act.stages) {
      startBonus(meta.act.key);
      return;
    }
    if (wave === TOTAL_CAMPAIGN_STAGES) {
      wave++;
      persistProgress();
      showCampaignCrown();
      return;
    }
    wave++;
    persistProgress();
    spawnStage();
  };

  function requestRevengeAd() {
    if (pendingRevenge) return;
    pendingRevenge = true;
    resetBtn.disabled = true;
    resetBtn.textContent = '광고 준비중...';

    const payload = {
      action: 'showRewardedAd',
      adGroupId: REWARD_AD_GROUP_ID,
      testAdGroupId: REWARD_AD_TEST_ID,
      reward: '복수기회',
      amount: 1
    };

    try {
      if (window.RewardAd && RewardAd.postMessage) {
        RewardAd.postMessage(JSON.stringify(payload));
        return;
      }
    } catch (_) {}

    setTimeout(() => window.applyRewardAdResult(false), 300);
  }

  window.applyRewardAdResult = function(success) {
    pendingRevenge = false;
    resetBtn.disabled = false;

    if (!success) {
      resetBtn.textContent = '복수하기';
      setMessage('광고를 완료하면 현재 단계에서 복수할 수 있어요');
      return;
    }

    wave = pendingRevengeWave;
    misses = 0;
    bonusMode = false;
    bonusType = '';
    bonusKilled = 0;
    persistProgress(wave, score, '');
    overlay.style.display = 'none';
    transitioning = false;
    running = true;
    spawnStage();
    showBanner('🔥 복수 시작!');
    setMessage('MISS 초기화 · 현재 단계에서 계속');
  };

  resetBtn.addEventListener('click', (e) => {
    if (resetBtn.dataset.action !== 'revenge') return;
    e.preventDefault();
    e.stopImmediatePropagation();
    ensureAudio();
    requestRevengeAd();
  }, true);

  retryBtn.addEventListener('click', (e) => {
    if (retryBtn.textContent !== '무한 혼합 도전') return;
    e.preventDefault();
    e.stopImmediatePropagation();
    ensureAudio();
    overlay.style.display = 'none';
    overlay.dataset.campaignCrown = '0';
    transitioning = false;
    running = true;
    persistProgress();
    spawnStage();
  }, true);

  window.BUG_HUNTER_V134 = {
    version: '1.3.4',
    concept: '무한 짜증 복수',
    rewardAdGroupId: REWARD_AD_GROUP_ID,
    testRewardAdGroupId: REWARD_AD_TEST_ID
  };
})();