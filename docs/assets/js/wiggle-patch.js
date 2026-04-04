(function () {
  'use strict';

  const STYLE_ID = 'wiggle-patch-styles';
  if (!document.getElementById(STYLE_ID)) {
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      @keyframes wiggleSoft {
        0%, 100% { transform: rotate(0deg); }
        22% { transform: rotate(-0.35deg); }
        46% { transform: rotate(0.3deg); }
        70% { transform: rotate(-0.2deg); }
        88% { transform: rotate(0.12deg); }
      }

      @keyframes wiggleCard {
        0%, 100% { transform: rotate(0deg) translateX(0) scale(1); }
        22% { transform: rotate(-0.35deg) translateX(-2px) scale(1.002); }
        48% { transform: rotate(0.3deg) translateX(2px) scale(1.002); }
        72% { transform: rotate(-0.2deg) translateX(-1px) scale(1.001); }
        88% { transform: rotate(0.12deg) translateX(1px) scale(1.001); }
      }

      .wiggle-ready {
        transform-origin: center;
        will-change: transform;
        backface-visibility: hidden;
      }
    `;
    document.head.appendChild(style);
  }

  const CFG = {
    idleDelay: 650,
    idleJitter: 350,
    repeatInterval: 1600,
    repeatJitter: 550,
    cardDuration: 1500,
    btnDuration: 1250,
    easing: 'cubic-bezier(0.37, 0, 0.63, 1)',
    requireActiveScreen: true,
    useWebAnimations: true,
    forceAnimation: false,
    respectReducedMotion: false,
    maxConcurrentWiggles: 4,
    retryDelay: 280,
    scanDelay: 40,
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
  const WIGGLE_SEL = HOME_CARD_SEL + ',' + BTN_SEL;

  const registry = new Map();
  const activeWiggles = new Set();
  const queuedRoots = new Set();
  let schedulerTimer = 0;
  let scanTimer = 0;

  const visibilityObserver = typeof IntersectionObserver === 'function'
    ? new IntersectionObserver(function (entries) {
        const wakeAt = now() + 220;
        entries.forEach(function (observerEntry) {
          const entry = registry.get(observerEntry.target);
          if (!entry) return;
          entry.intersecting = observerEntry.isIntersecting;
          if (observerEntry.isIntersecting && !entry.running) {
            entry.nextAt = Math.min(entry.nextAt, wakeAt);
          }
        });
        queueScheduler();
      }, { threshold: 0.01 })
    : null;

  function now() {
    return (window.performance && typeof window.performance.now === 'function')
      ? window.performance.now()
      : Date.now();
  }

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

  function isRenderable(entry) {
    if (document.hidden || !entry.el.isConnected) return false;
    if (entry.intersecting === false) return false;
    if (!isInActiveScreen(entry.el)) return false;
    return entry.el.getClientRects().length > 0;
  }

  function createWiggleProfile() {
    return {
      amp: 0.6 + Math.random() * 0.6,
      drift: 0.6 + Math.random() * 0.8,
      speed: 0.92 + Math.random() * 0.22,
      rotSign: Math.random() < 0.5 ? -1 : 1,
      driftSign: Math.random() < 0.5 ? -1 : 1,
      alt: Math.random() < 0.5,
    };
  }

  function buildFrames(kind, profile, allowDrift, boost) {
    const key = profile.alt ? (kind + 'B') : kind;
    const base = KEYFRAMES[key] || KEYFRAMES[kind] || KEYFRAMES.wiggleSoft;
    const ampBase = kind === 'wiggleSoft' ? 1.62 : 1;
    const ampBoost = boost || 1;
    const scaleBoost = 1 + (ampBoost - 1) * 0.2;
    const scaleBase = kind === 'wiggleSoft' ? 0.2 : 1;

    return base.map(function (frame) {
      const rot = frame.rot * profile.amp * ampBase * profile.rotSign * ampBoost;
      const drift = allowDrift ? frame.drift * profile.drift * profile.driftSign : 0;
      const scale = 1 + (frame.scale - 1) * scaleBase * (0.7 + 0.3 * profile.amp) * scaleBoost;
      return {
        transform: `rotate(${rot}deg) translateX(${drift}px) scale(${scale})`,
        offset: frame.offset,
        composite: 'add',
      };
    });
  }

  function clearFallbackAnimation(target) {
    if (!target) return;
    if (CFG.forceAnimation) {
      target.style.removeProperty('animation');
      target.style.removeProperty('animation-play-state');
      return;
    }
    target.style.animation = '';
    target.style.animationPlayState = '';
  }

  function cancelAnimation(target) {
    if (!target) return;
    if (target._wiggleAnim) {
      try {
        target._wiggleAnim.cancel();
      } catch (err) {}
      target._wiggleAnim = null;
    }
    clearFallbackAnimation(target);
  }

  function clearEntryTimer(entry) {
    if (!entry.cleanupTimer) return;
    clearTimeout(entry.cleanupTimer);
    entry.cleanupTimer = 0;
  }

  function scheduleEntry(entry, delay) {
    entry.nextAt = now() + Math.max(120, delay);
    queueScheduler();
  }

  function scheduleRepeat(entry) {
    scheduleEntry(entry, rand(CFG.repeatInterval, CFG.repeatJitter));
  }

  function finishEntry(entry, token) {
    if (!registry.has(entry.el) || entry.token !== token) return;
    clearEntryTimer(entry);
    if (entry.target && entry.target._wiggleAnim) {
      entry.target._wiggleAnim = null;
    }
    clearFallbackAnimation(entry.target);
    entry.running = false;
    activeWiggles.delete(entry.el);
    scheduleRepeat(entry);
  }

  function stopEntry(entry, delay) {
    entry.token += 1;
    clearEntryTimer(entry);
    entry.running = false;
    activeWiggles.delete(entry.el);
    cancelAnimation(entry.target);
    if (typeof delay === 'number') {
      scheduleEntry(entry, delay);
    }
  }

  function unregister(el) {
    const entry = registry.get(el);
    if (!entry) return;
    stopEntry(entry);
    if (visibilityObserver) visibilityObserver.unobserve(el);
    registry.delete(el);
  }

  function startWiggle(entry) {
    const target = entry.target;
    const token = entry.token + 1;
    const durationMs = Math.round(entry.duration * entry.durationScale);

    entry.token = token;
    entry.running = true;
    activeWiggles.add(entry.el);

    if (CFG.useWebAnimations && typeof target.animate === 'function') {
      cancelAnimation(target);
      const anim = target.animate(entry.frames, {
        duration: durationMs,
        easing: CFG.easing,
        fill: 'none',
      });
      target._wiggleAnim = anim;
      anim.finished.then(
        function () { finishEntry(entry, token); },
        function () { finishEntry(entry, token); }
      );
      return;
    }

    const animValue = `${entry.keyframe} ${durationMs}ms ${CFG.easing} both`;
    if (CFG.forceAnimation) {
      target.style.setProperty('animation', animValue, 'important');
      target.style.setProperty('animation-play-state', 'running', 'important');
    } else {
      target.style.animation = animValue;
      target.style.animationPlayState = 'running';
    }

    entry.cleanupTimer = setTimeout(function () {
      finishEntry(entry, token);
    }, durationMs + 60);
  }

  function queueScheduler() {
    if (!registry.size) return;

    const current = now();
    let nextDelay = Infinity;

    registry.forEach(function (entry, el) {
      if (!el.isConnected) {
        unregister(el);
        return;
      }
      if (entry.running) return;
      nextDelay = Math.min(nextDelay, Math.max(16, entry.nextAt - current));
    });

    if (!isFinite(nextDelay)) return;

    if (schedulerTimer) clearTimeout(schedulerTimer);
    schedulerTimer = setTimeout(runScheduler, nextDelay);
  }

  function runScheduler() {
    schedulerTimer = 0;
    const current = now();

    registry.forEach(function (entry, el) {
      if (!el.isConnected) {
        unregister(el);
        return;
      }
      if (entry.running || entry.nextAt > current) return;
      if (!isRenderable(entry)) {
        scheduleEntry(entry, CFG.retryDelay);
        return;
      }
      if (isBeingPressed(el)) {
        scheduleEntry(entry, 220);
        return;
      }
      if (CFG.maxConcurrentWiggles && activeWiggles.size >= CFG.maxConcurrentWiggles) {
        scheduleEntry(entry, CFG.retryDelay);
        return;
      }
      startWiggle(entry);
    });

    queueScheduler();
  }

  function register(el, keyframe, duration) {
    if (!el || registry.has(el)) return;

    const profile = createWiggleProfile();
    const boost = el.classList.contains('tgl') ? 1.25 : 1;
    const entry = {
      el: el,
      target: el,
      keyframe: keyframe,
      duration: duration,
      durationScale: profile.speed,
      frames: buildFrames(keyframe, profile, keyframe === 'wiggleCard', boost),
      nextAt: now() + rand(CFG.idleDelay, CFG.idleJitter),
      running: false,
      cleanupTimer: 0,
      token: 0,
      intersecting: true,
    };

    el.classList.add('wiggle-ready');
    registry.set(el, entry);
    if (visibilityObserver) visibilityObserver.observe(el);
    queueScheduler();
  }

  function registerWithin(root) {
    if (!root || root.nodeType !== 1) return;
    if (root.matches(HOME_CARD_SEL)) register(root, 'wiggleCard', CFG.cardDuration);
    if (root.matches(BTN_SEL) && !root.closest(HOME_CARD_SEL)) {
      register(root, 'wiggleSoft', CFG.btnDuration);
    }

    root.querySelectorAll(HOME_CARD_SEL).forEach(function (el) {
      register(el, 'wiggleCard', CFG.cardDuration);
    });

    root.querySelectorAll(BTN_SEL).forEach(function (el) {
      if (el.closest(HOME_CARD_SEL)) return;
      register(el, 'wiggleSoft', CFG.btnDuration);
    });
  }

  function registerAll() {
    registerWithin(document.body);
  }

  function queueScan(root) {
    if (!root) return;
    if (root === document.body) {
      queuedRoots.clear();
      queuedRoots.add(root);
    } else if (!queuedRoots.has(document.body)) {
      queuedRoots.add(root);
    }

    if (scanTimer) return;
    scanTimer = setTimeout(flushScanQueue, CFG.scanDelay);
  }

  function flushScanQueue() {
    scanTimer = 0;
    if (!queuedRoots.size) return;

    const roots = Array.from(queuedRoots);
    queuedRoots.clear();

    roots.forEach(function (root) {
      if (root === document.body) {
        registerAll();
        return;
      }
      registerWithin(root);
    });
  }

  function isIgnorableNode(node) {
    return (
      !node ||
      node.nodeType !== 1 ||
      (node.classList && (
        node.classList.contains('ripple-dot') ||
        node.classList.contains('party-particle')
      ))
    );
  }

  function pauseWiggle(el) {
    const entry = registry.get(el);
    if (!entry) return;
    stopEntry(entry, 420);
  }

  function resumeWiggle(el) {
    const entry = registry.get(el);
    if (!entry || entry.running) return;
    entry.nextAt = Math.min(entry.nextAt, now() + 420);
    queueScheduler();
  }

  document.addEventListener('pointerdown', function (e) {
    const el = e.target.closest(WIGGLE_SEL);
    if (el) pauseWiggle(el);
  }, { passive: true });

  document.addEventListener('pointerup', function (e) {
    const el = e.target.closest(WIGGLE_SEL);
    if (el) resumeWiggle(el);
  }, { passive: true });

  document.addEventListener('pointercancel', function (e) {
    const el = e.target.closest(WIGGLE_SEL);
    if (el) resumeWiggle(el);
  }, { passive: true });

  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      mutation.removedNodes.forEach(function (node) {
        if (node.nodeType !== 1) return;
        if (registry.has(node)) unregister(node);
        if (typeof node.querySelectorAll === 'function') {
          node.querySelectorAll(WIGGLE_SEL).forEach(function (el) {
            unregister(el);
          });
        }
      });

      mutation.addedNodes.forEach(function (node) {
        if (isIgnorableNode(node)) return;
        queueScan(node);
      });
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (CFG.respectReducedMotion && reducedMotion.matches) {
    observer.disconnect();
    return;
  }
  reducedMotion.addEventListener('change', function (event) {
    if (!CFG.respectReducedMotion) return;
    if (event.matches) {
      observer.disconnect();
      registry.forEach(function (entry) {
        stopEntry(entry);
      });
      return;
    }
    queueScan(document.body);
  });

  document.addEventListener('visibilitychange', function () {
    registry.forEach(function (entry) {
      if (document.hidden) {
        stopEntry(entry, CFG.idleDelay);
      } else if (!entry.running) {
        entry.nextAt = Math.min(entry.nextAt, now() + CFG.idleDelay);
      }
    });
    queueScheduler();
  });

  setTimeout(function () {
    queueScan(document.body);
  }, 350);
})();
