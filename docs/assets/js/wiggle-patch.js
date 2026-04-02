/* ═══════════════════════════════════════════════════════════════
   WIGGLE PATCH — Idle wiggle animations for buttons & home cards
   Inject this as a <script> AFTER game.js and ripple-patch.js

   Strategy: pure JS-driven style injection so we never touch
   existing CSS rules. Wiggles are applied via inline animation
   on a per-element basis, paused automatically when the element
   is being pressed or the screen is inactive.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  // ── 1. Inject keyframes once into a dedicated <style> tag ────
  const STYLE_ID = 'wiggle-patch-styles';
  if (!document.getElementById(STYLE_ID)) {
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
                              @keyframes wiggleSoft {
        0%,100% { transform: rotate(0deg); }
        22%      { transform: rotate(-0.35deg); }
        46%      { transform: rotate(0.3deg); }
        70%      { transform: rotate(-0.2deg); }
        88%      { transform: rotate(0.12deg); }
      }
      @keyframes wiggleCard {
        0%,100% { transform: rotate(0deg) translateX(0) scale(1); }
        22%      { transform: rotate(-0.35deg) translateX(-2px) scale(1.002); }
        48%      { transform: rotate(0.3deg) translateX(2px) scale(1.002); }
        72%      { transform: rotate(-0.2deg) translateX(-1px) scale(1.001); }
        88%      { transform: rotate(0.12deg) translateX(1px) scale(1.001); }
      }
      @keyframes wigglePulse {
        0%,100% { transform: scale(1); }
        35%      { transform: scale(1.01); }
        65%      { transform: scale(0.996); }
        85%      { transform: scale(1.004); }
      }
      .wiggle-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: inherit;
        width: 100%;
        height: 100%;
        transform-origin: center;
        will-change: transform;
      }
      /* Prevent wiggle while user is pressing */
      .wiggle-paused {
        animation-play-state: paused !important;
      }
    `;
    document.head.appendChild(style);
  }

  // ── 2. Configuration ─────────────────────────────────────────
  const CFG = {
    // How long a button must be idle before its wiggle starts (ms)
    idleDelay: 600,
    // Max random extra idle delay so buttons don't all wiggle together (ms)
    idleJitter: 400,
    // How long between wiggle cycles (ms) � time at rest between animations
    repeatInterval: 1400,
    repeatJitter: 600,
    // Duration of one wiggle animation (ms)
    cardDuration: 1700,
    btnDuration: 1400,
    // Easing for the wiggle motion
    easing: 'cubic-bezier(0.37, 0, 0.63, 1)',
    // Only wiggle when the parent screen has class 'active'
    requireActiveScreen: true,
    // Wiggle buttons via an inner wrapper so other transforms/transitions still apply
    wrapButtons: false,
    // Prefer Web Animations API to avoid clobbering other animations
    useWebAnimations: true,
    // Use !important when falling back to CSS animation
    forceAnimation: false,
    // Respect prefers-reduced-motion (set to false to force wiggle anyway)
    respectReducedMotion: false,
    // Limit concurrent wiggles to keep FPS smooth (mobile perf)
    maxConcurrentWiggles: 6,
  };
  const KEYFRAMES = {
    wiggleSoft: [
      { rot: 0, drift: 0, scale: 1, offset: 0 },
      { rot: -0.35, drift: 0, scale: 1, offset: 0.22 },
      { rot: 0.3, drift: 0, scale: 1, offset: 0.46 },
      { rot: -0.2, drift: 0, scale: 1, offset: 0.7 },
      { rot: 0.12, drift: 0, scale: 1, offset: 0.88 },
      { rot: 0, drift: 0, scale: 1, offset: 1 },
    ],
    wiggleSoftB: [
      { rot: 0, drift: 0, scale: 1, offset: 0 },
      { rot: -0.28, drift: 0, scale: 1, offset: 0.18 },
      { rot: 0.34, drift: 0, scale: 1, offset: 0.4 },
      { rot: -0.18, drift: 0, scale: 1, offset: 0.62 },
      { rot: 0.1, drift: 0, scale: 1, offset: 0.82 },
      { rot: 0, drift: 0, scale: 1, offset: 1 },
    ],
    wiggleCard: [
      { rot: 0, drift: 0, scale: 1, offset: 0 },
      { rot: -0.35, drift: -2, scale: 1.002, offset: 0.22 },
      { rot: 0.3, drift: 2, scale: 1.002, offset: 0.48 },
      { rot: -0.2, drift: -1, scale: 1.001, offset: 0.72 },
      { rot: 0.12, drift: 1, scale: 1.001, offset: 0.88 },
      { rot: 0, drift: 0, scale: 1, offset: 1 },
    ],
    wiggleCardB: [
      { rot: 0, drift: 0, scale: 1, offset: 0 },
      { rot: -0.3, drift: -2.4, scale: 1.002, offset: 0.2 },
      { rot: 0.32, drift: 2.2, scale: 1.002, offset: 0.44 },
      { rot: -0.18, drift: -1.1, scale: 1.001, offset: 0.68 },
      { rot: 0.1, drift: 0.9, scale: 1.001, offset: 0.86 },
      { rot: 0, drift: 0, scale: 1, offset: 1 },
    ],
  };
  const isCoarsePointer = window.matchMedia && window.matchMedia('(hover: none)').matches;
  if (isCoarsePointer) {
    CFG.maxConcurrentWiggles = 2;
    CFG.idleDelay            = 1400;
    CFG.idleJitter           = 600;
    CFG.repeatInterval       = 3000;
    CFG.repeatJitter         = 800;
  }

  // ── 3. Selectors ─────────────────────────────────────────────
  const HOME_CARD_SEL = '#s-home .menu-grid > div';
  const BTN_SEL = [
    '.btn',
    '.tgl',
    '.genre-card',
    '.vote-option',
    '.gq-choice',
    '.punish-opt',
    '.guess-opt',
    '.btn-add-player',    '#btn-show-word',
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

  // ── 4. Helpers ───────────────────────────────────────────────
  function rand(base, jitter) {
    return base + Math.random() * jitter;
  }

  function isInActiveScreen(el) {
    if (!CFG.requireActiveScreen) return true;
    const screen = el.closest('.screen');
    return screen ? screen.classList.contains('active') : true;
  }

  function isBeingPressed(el) {
    return (
      el.classList.contains('ui-pressing') ||
      el.classList.contains('menu-pressing') ||
      el.matches(':active')
    );
  }

  function isVisible(el) {
    return !!(el.offsetParent !== null || el.getBoundingClientRect().width > 0);
  }

  
  const WRAP_BTN_SEL = 'button, .btn, .tgl, .btn-add-player, .lang-btn';

  function shouldWrap(el) {
    return CFG.wrapButtons && el.matches(WRAP_BTN_SEL);
  }

  function unwrapWiggle(el) {
    const wrap = el.querySelector('.wiggle-wrap');
    if (!wrap || wrap.parentElement !== el) return;
    while (wrap.firstChild) el.insertBefore(wrap.firstChild, wrap);
    wrap.remove();
  }

  function getWiggleTarget(el) {
    if (el._wiggleTarget && el._wiggleTarget !== el && !CFG.wrapButtons) {
      unwrapWiggle(el);
      el._wiggleTarget = el;
      return el;
    }
    if (el._wiggleTarget) return el._wiggleTarget;
    if (!CFG.wrapButtons) {
      unwrapWiggle(el);
      el._wiggleTarget = el;
      return el;
    }
    if (shouldWrap(el)) {
      const existing = el.querySelector('.wiggle-wrap');
      if (existing && existing.parentElement === el) {
        el._wiggleTarget = existing;
        return existing;
      }
      const wrap = document.createElement('span');
      wrap.className = 'wiggle-wrap';
      while (el.firstChild) wrap.appendChild(el.firstChild);
      el.appendChild(wrap);
      el._wiggleTarget = wrap;
      return wrap;
    }
    el._wiggleTarget = el;
    return el;
  }

  function getWiggleProfile(el) {
    if (el._wiggleProfile) return el._wiggleProfile;
    const amp = 0.6 + Math.random() * 0.6;
    const drift = 0.6 + Math.random() * 0.8;
    const speed = 0.9 + Math.random() * 0.25;
    const rotSign = Math.random() < 0.5 ? -1 : 1;
    const driftSign = Math.random() < 0.5 ? -1 : 1;
    const alt = Math.random() < 0.5;
    el._wiggleProfile = { amp, drift, speed, rotSign, driftSign, alt };
    return el._wiggleProfile;
  }

  function buildFrames(kind, profile, allowDrift, boost) {
    const key = profile.alt ? (kind + 'B') : kind;
    const base = KEYFRAMES[key] || KEYFRAMES[kind] || KEYFRAMES.wiggleSoft;
    const ampBase = kind === 'wiggleSoft' ? 1.62 : 1;
    const ampBoost = boost || 1;
    const scaleBoost = 1 + (ampBoost - 1) * 0.2;
    const scaleBase = kind === 'wiggleSoft' ? 0.2 : 1;
    return base.map((f) => {
      const rot = f.rot * profile.amp * ampBase * profile.rotSign * ampBoost;
      const drift = allowDrift ? f.drift * profile.drift * profile.driftSign : 0;
      const scale = 1 + (f.scale - 1) * scaleBase * (0.7 + 0.3 * profile.amp) * scaleBoost;
      return {
        transform: `rotate(${rot}deg) translateX(${drift}px) scale(${scale})`,
        offset: f.offset,
        composite: 'add',
      };
    });
  }

  // -- 5. Core wiggle scheduler ----------------------------------
  function scheduleWiggle(el, target, keyframe, duration, delay) {
    const timer = setTimeout(function tick() {
      // Bail if element was removed from DOM
      if (!document.contains(el)) return;
      // Bail if screen is not active or element invisible
      if (!isInActiveScreen(el) || !isVisible(el)) {
        // Retry after a pause � screen may become active later
        _activeWiggles.delete(el);
        el._wiggleTimer = setTimeout(tick, rand(CFG.repeatInterval, CFG.repeatJitter));
        return;
      }
      // Bail silently if pointer is still down on this element
      if (isBeingPressed(el)) {
        el._wiggleTimer = setTimeout(tick, 400);
        return;
      }

      if (CFG.maxConcurrentWiggles && _activeWiggles.size >= CFG.maxConcurrentWiggles && !_activeWiggles.has(el)) {
        el._wiggleTimer = setTimeout(tick, 260);
        return;
      }

      _activeWiggles.add(el);

      const usingWAAPI = CFG.useWebAnimations && typeof target.animate === 'function';
      const profile = getWiggleProfile(el);
      const allowDrift = keyframe === 'wiggleCard';
      const boost = el.classList.contains('tgl') ? 1.25 : 1;
      const durationMs = Math.round(duration * profile.speed);

      if (usingWAAPI) {
        if (target._wiggleAnim) target._wiggleAnim.cancel();
        const frames = buildFrames(keyframe, profile, allowDrift, boost);
        const anim = target.animate(frames, {
          duration: durationMs,
          easing: CFG.easing,
          fill: 'none',
        });
        target._wiggleAnim = anim;
        anim.onfinish = () => {
          if (target._wiggleAnim === anim) target._wiggleAnim = null; _activeWiggles.delete(el);
        };
      } else {
        const animValue = `${keyframe} ${durationMs}ms ${CFG.easing} both`;
        if (CFG.forceAnimation) {
          target.style.setProperty('animation', animValue, 'important');
          target.style.setProperty('animation-play-state', 'running', 'important');
        } else {
          target.style.animation = animValue;
          target.style.animationPlayState = 'running';
        }
      }

      // After it finishes, clear inline animation and schedule next cycle
      const cleanup = setTimeout(() => {
        if (usingWAAPI) {
          if (target._wiggleAnim) {
            target._wiggleAnim.cancel();
            target._wiggleAnim = null;
          }
        } else {
          // Only clear if the animation we set is still the current one
          const currentAnim = target.style.getPropertyValue('animation') || target.style.animation;
          if (currentAnim && currentAnim.startsWith(keyframe)) {
            if (CFG.forceAnimation) {
              target.style.removeProperty('animation');
              target.style.removeProperty('animation-play-state');
            } else {
              target.style.animation = '';
              target.style.animationPlayState = '';
            }
          }
        }
        _activeWiggles.delete(el);
        el._wiggleTimer = setTimeout(tick, rand(CFG.repeatInterval, CFG.repeatJitter));
      }, duration + 40);

      el._wiggleCleanup = cleanup;
    }, delay);

    el._wiggleTimer = timer;
  }

  // -- 6. Pause wiggle on press, resume on release ----------------
  function pauseWiggle(el) {
    const target = getWiggleTarget(el);
    if (target._wiggleAnim) {
      target._wiggleAnim.cancel();
      target._wiggleAnim = null;
      return;
    }
    const currentAnim = target.style.getPropertyValue('animation') || target.style.animation;
    if (!currentAnim) return;
    if (CFG.forceAnimation) {
      target.style.removeProperty('animation');
      target.style.removeProperty('animation-play-state');
    } else {
      target.style.animation = '';
      target.style.animationPlayState = '';
    }
  }
  function resumeWiggle(el) {
    const target = getWiggleTarget(el);
    if (target._wiggleAnim) {
      target._wiggleAnim.cancel();
      target._wiggleAnim = null;
      return;
    }
    const currentAnim = target.style.getPropertyValue('animation') || target.style.animation;
    if (!currentAnim) return;
    if (CFG.forceAnimation) {
      target.style.removeProperty('animation');
      target.style.removeProperty('animation-play-state');
    } else {
      target.style.animation = '';
      target.style.animationPlayState = '';
    }
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

  // ── 7. Register an element ────────────────────────────────────
  const _registered = new WeakSet();
  const _activeWiggles = new Set();

  function register(el, keyframe, duration) {
    if (_registered.has(el)) return;
    _registered.add(el);
    const delay = rand(CFG.idleDelay, CFG.idleJitter);
    const target = getWiggleTarget(el);
    scheduleWiggle(el, target, keyframe, duration, delay);
  }

  // ── 8. Initial registration pass ─────────────────────────────
  function registerAll() {
    // Home menu cards — use the card-flavoured wiggle (subtler rotation)
    document.querySelectorAll(HOME_CARD_SEL).forEach(function (el) {
      register(el, 'wiggleCard', CFG.cardDuration);
    });

    // On mobile we only wiggle the home cards.
    // Registering every button on a touch device (30+ elements) eats
    // frame budget and produces an animation users can barely see.
    if (isCoarsePointer) return;

    // All buttons — use the button-flavoured wiggle (desktop only)
    document.querySelectorAll(BTN_SEL).forEach(function (el) {
      // Skip elements inside home cards (already handled) and hidden ones
      if (el.closest(HOME_CARD_SEL)) return;
      register(el, 'wiggleSoft', CFG.btnDuration);
    });
  }

  // ── 9. Re-scan on DOM mutations (screens rendered dynamically) ─
  // Lightweight: only re-scan when nodes are added
  // Debounce: coalesce rapid DOM mutations into one registerAll() call.
  // Without this, the observer fires for every single inserted node —
  // on a screen transition that can mean 50-100 calls in <16 ms.
  let _mutationTimer = null;
  const _mutationDelay = isCoarsePointer ? 600 : 300;
  const observer = new MutationObserver(function (mutations) {
    let shouldScan = false;
    for (const m of mutations) {
      if (m.addedNodes.length) { shouldScan = true; break; }
    }
    if (!shouldScan) return;
    clearTimeout(_mutationTimer);
    _mutationTimer = setTimeout(registerAll, _mutationDelay);
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // ── 10. Reduce motion: respect user preference ────────────────
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (CFG.respectReducedMotion && reducedMotion.matches) {
    // Don't start anything � user asked for reduced motion
    observer.disconnect();
    return;
  }
  reducedMotion.addEventListener('change', function (e) {
    if (CFG.respectReducedMotion && e.matches) observer.disconnect();
  });

  // ── 11. Initial run ───────────────────────────────────────────
  // Wait for the rest of the scripts (game.js, ripple-patch.js) to finish
  // rendering the initial DOM before scanning
  setTimeout(registerAll, 350);

})();























































