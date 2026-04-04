(function () {
  'use strict';

  const STYLE_ID = 'wiggle-patch-styles';
  if (!document.getElementById(STYLE_ID)) {
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      @keyframes wiggleSoftPatch {
        0%,100% { transform: rotate(0deg) scale(1); }
        30% { transform: rotate(-0.22deg) scale(1.004); }
        60% { transform: rotate(0.18deg) scale(1.003); }
        82% { transform: rotate(-0.1deg) scale(1.001); }
      }
      @keyframes wiggleCardPatch {
        0%,100% { transform: rotate(0deg) translateX(0) scale(1); }
        28% { transform: rotate(-0.26deg) translateX(-1.2px) scale(1.003); }
        58% { transform: rotate(0.2deg) translateX(1.1px) scale(1.003); }
        84% { transform: rotate(-0.1deg) translateX(-0.5px) scale(1.001); }
      }
    `;
    document.head.appendChild(style);
  }

  const isCoarsePointer = !!(window.matchMedia && window.matchMedia('(hover: none)').matches);
  const CFG = {
    idleDelay: 1400,
    idleJitter: 900,
    repeatInterval: 3400,
    repeatJitter: 1800,
    cardDuration: 1050,
    btnDuration: 820,
    easing: 'cubic-bezier(0.37, 0, 0.63, 1)',
    requireActiveScreen: true,
    respectReducedMotion: false,
    useWebAnimations: true,
    maxConcurrentWiggles: isCoarsePointer ? 2 : 3,
  };

  const HOME_CARD_SEL = '#s-home .menu-grid > div';
  const BTN_SEL = [
    '.btn',
    '.tgl',
    '.genre-card',
    '.vote-option',
    '.gq-choice',
    '.punish-opt',
    '.guess-opt',
    '.btn-add-player',
    '#btn-show-word',
    '#btn-show-swap',
    '#btn-memorized',
    '#btn-done-q',
    '#btn-skip-q',
    '#btn-twist-ok',
    '#btn-start',
    '#btn-start-round',
    '#btn-reveal',
    '#btn-rematch',
    '#btn-done-questions'
  ].join(',');

  const _registered = new WeakSet();
  const _activeWiggles = new Set();
  let _scanQueued = false;

  function rand(base, jitter) {
    return base + Math.random() * jitter;
  }

  function isInActiveScreen(el) {
    if (!CFG.requireActiveScreen) return true;
    const screen = el.closest('.screen');
    return screen ? screen.classList.contains('active') : true;
  }

  function isBeingPressed(el) {
    return el.classList.contains('ui-pressing') ||
      el.classList.contains('menu-pressing') ||
      el.matches(':active');
  }

  function isVisible(el) {
    const rect = el.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0 && el.offsetParent !== null;
  }

  function getFrames(kind, el) {
    const isToggle = el.classList.contains('tgl');
    const amp = isToggle ? 1.08 : 1;
    if (kind === 'wiggleCardPatch') {
      return [
        { transform: 'rotate(0deg) translateX(0) scale(1)', offset: 0 },
        { transform: `rotate(${-0.26 * amp}deg) translateX(-1.2px) scale(1.003)`, offset: 0.28 },
        { transform: `rotate(${0.2 * amp}deg) translateX(1.1px) scale(1.003)`, offset: 0.58 },
        { transform: `rotate(${-0.1 * amp}deg) translateX(-0.5px) scale(1.001)`, offset: 0.84 },
        { transform: 'rotate(0deg) translateX(0) scale(1)', offset: 1 },
      ];
    }
    return [
      { transform: 'rotate(0deg) scale(1)', offset: 0 },
      { transform: `rotate(${-0.22 * amp}deg) scale(1.004)`, offset: 0.3 },
      { transform: `rotate(${0.18 * amp}deg) scale(1.003)`, offset: 0.6 },
      { transform: `rotate(${-0.1 * amp}deg) scale(1.001)`, offset: 0.82 },
      { transform: 'rotate(0deg) scale(1)', offset: 1 },
    ];
  }

  function clearTimers(el) {
    if (el._wiggleTimer) {
      clearTimeout(el._wiggleTimer);
      el._wiggleTimer = null;
    }
    if (el._wiggleCleanup) {
      clearTimeout(el._wiggleCleanup);
      el._wiggleCleanup = null;
    }
  }

  function scheduleWiggle(el, kind, duration, delay) {
    clearTimers(el);
    el._wiggleTimer = setTimeout(function tick() {
      if (!document.contains(el)) return;
      if (!isVisible(el) || !isInActiveScreen(el)) {
        el._wiggleTimer = setTimeout(tick, rand(CFG.repeatInterval, CFG.repeatJitter));
        return;
      }
      if (isBeingPressed(el)) {
        el._wiggleTimer = setTimeout(tick, 600);
        return;
      }
      if (CFG.maxConcurrentWiggles && _activeWiggles.size >= CFG.maxConcurrentWiggles && !_activeWiggles.has(el)) {
        el._wiggleTimer = setTimeout(tick, 420);
        return;
      }

      _activeWiggles.add(el);
      const durationMs = Math.round(duration * (0.92 + Math.random() * 0.16));
      const frames = getFrames(kind, el);

      if (CFG.useWebAnimations && typeof el.animate === 'function') {
        if (el._wiggleAnim) el._wiggleAnim.cancel();
        const anim = el.animate(frames, {
          duration: durationMs,
          easing: CFG.easing,
          fill: 'none'
        });
        el._wiggleAnim = anim;
        anim.onfinish = () => {
          if (el._wiggleAnim === anim) el._wiggleAnim = null;
          _activeWiggles.delete(el);
        };
      } else {
        el.style.animation = `${kind} ${durationMs}ms ${CFG.easing} both`;
      }

      el._wiggleCleanup = setTimeout(() => {
        if (el._wiggleAnim) {
          el._wiggleAnim.cancel();
          el._wiggleAnim = null;
        }
        if (el.style.animation && el.style.animation.indexOf(kind) === 0) {
          el.style.animation = '';
        }
        _activeWiggles.delete(el);
        el._wiggleTimer = setTimeout(tick, rand(CFG.repeatInterval, CFG.repeatJitter));
      }, durationMs + 60);
    }, delay);
  }

  function register(el, kind, duration) {
    if (_registered.has(el)) return;
    _registered.add(el);
    scheduleWiggle(el, kind, duration, rand(CFG.idleDelay, CFG.idleJitter));
  }

  function registerAll() {
    _scanQueued = false;
    const scopes = [];
    const activeScreen = document.querySelector('.screen.active');
    if (activeScreen) scopes.push(activeScreen);
    const rulesModal = document.getElementById('rules-modal');
    if (rulesModal && !rulesModal.classList.contains('hidden')) scopes.push(rulesModal);
    const settingsModal = document.getElementById('settings-modal');
    if (settingsModal && !settingsModal.classList.contains('hidden')) scopes.push(settingsModal);
    if (!scopes.length) scopes.push(document);

    scopes.forEach(scope => {
      scope.querySelectorAll(HOME_CARD_SEL).forEach(el => register(el, 'wiggleCardPatch', CFG.cardDuration));
      scope.querySelectorAll(BTN_SEL).forEach(el => {
        if (el.closest(HOME_CARD_SEL)) return;
        register(el, 'wiggleSoftPatch', CFG.btnDuration);
      });
    });
  }

  function queueRegisterAll() {
    if (_scanQueued) return;
    _scanQueued = true;
    requestAnimationFrame(registerAll);
  }

  function pauseWiggle(el) {
    clearTimers(el);
    if (el._wiggleAnim) {
      el._wiggleAnim.cancel();
      el._wiggleAnim = null;
    }
    _activeWiggles.delete(el);
  }

  function resumeWiggle(el) {
    if (!_registered.has(el)) return;
    const kind = el.closest(HOME_CARD_SEL) ? 'wiggleCardPatch' : 'wiggleSoftPatch';
    const duration = el.closest(HOME_CARD_SEL) ? CFG.cardDuration : CFG.btnDuration;
    scheduleWiggle(el, kind, duration, rand(900, 700));
  }

  document.addEventListener('pointerdown', function (e) {
    const el = e.target.closest(HOME_CARD_SEL + ',' + BTN_SEL);
    if (el) pauseWiggle(el);
  }, { passive: true });

  document.addEventListener('pointerup', function (e) {
    const el = e.target.closest(HOME_CARD_SEL + ',' + BTN_SEL);
    if (el) resumeWiggle(el);
  }, { passive: true });

  document.addEventListener('pointercancel', function (e) {
    const el = e.target.closest(HOME_CARD_SEL + ',' + BTN_SEL);
    if (el) resumeWiggle(el);
  }, { passive: true });

  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) queueRegisterAll();
  });

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (CFG.respectReducedMotion && reducedMotion.matches) return;

  const observer = new MutationObserver(function (mutations) {
    let shouldScan = false;
    for (const mutation of mutations) {
      if (mutation.type === 'attributes' || mutation.addedNodes.length) {
        shouldScan = true;
        break;
      }
    }
    if (shouldScan) queueRegisterAll();
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class']
  });

  setTimeout(queueRegisterAll, 350);
})();
