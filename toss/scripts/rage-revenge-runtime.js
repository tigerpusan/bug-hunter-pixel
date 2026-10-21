// BUG HUNTER Toss V1.3.4 - RAGE REVENGE runtime
(() => {
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
      ovCard.classList.add('fail');
      ovIcon.textContent = '💥';
      ovTitle.textContent = '아... 아쉽게 실패!';
      ovText.textContent = message;
      retryBtn.textContent = '다시하기';
      resetBtn.textContent = '광고 보고 복수하기';
      resetBtn.dataset.action = 'revenge';
      setMessage('광고 1회 · 현재 단계부터 복수');
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

    openResult(
      false,
      'MISS 3회. ' + pestFailName(meta) + '에게 털렸습니다.'
    );
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

  async function requestRevengeAd() {
    if (pendingRevenge) return;

    pendingRevenge = true;
    resetBtn.disabled = true;
    resetBtn.textContent = '광고 준비중...';
    setMessage('복수 광고를 준비하고 있어요');

    try {
      const ads = window.BugHunterTossAds;
      if (!ads || typeof ads.showRewarded !== 'function') {
        throw new Error('rewarded ad bridge unavailable');
      }

      const rewarded = await ads.showRewarded();

      if (!rewarded) {
        resetBtn.disabled = false;
        resetBtn.textContent = '광고 보고 복수하기';
        setMessage('광고 완료 후에만 현재 단계에서 복수할 수 있어요');
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
    } catch (_) {
      resetBtn.disabled = false;
      resetBtn.textContent = '광고 보고 복수하기';
      setMessage('광고를 불러오지 못했어요. 잠시 후 다시 시도해 주세요');
    } finally {
      pendingRevenge = false;
    }
  }

  resetBtn.addEventListener('click', (event) => {
    if (resetBtn.dataset.action !== 'revenge') return;

    event.preventDefault();
    event.stopImmediatePropagation();
    ensureAudio();
    requestRevengeAd();
  }, true);

  retryBtn.addEventListener('click', (event) => {
    if (retryBtn.textContent !== '무한 혼합 도전') return;

    event.preventDefault();
    event.stopImmediatePropagation();
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
    concept: '짜증날때 더 짜증나는 게임',
    monetization: 'rewarded-revenge-only',
  };
})();
