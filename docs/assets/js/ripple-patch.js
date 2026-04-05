(function () {
  'use strict';

  const STYLE_ID = 'ripple-patch-styles';
  const RIPPLE_MS = 460;
  const RIPPLE_EASING = 'cubic-bezier(0.22, 1, 0.36, 1)';

  const RIPPLE_SEL = [
    '.btn',
    '.tgl',
    '.menu-grid > div',
    '.vote-option',
    '.genre-card',
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
  ].join(',');

  if (!document.getElementById(STYLE_ID)) {
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .ripple-dot {
        position: absolute;
        width: 36px;
        height: 36px;
        margin: 0;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.72) 0%, rgba(255, 255, 255, 0.42) 46%, rgba(255, 255, 255, 0) 76%);
        transform: translate3d(-50%, -50%, 0) scale(0);
        opacity: 0;
        pointer-events: none;
        z-index: 3;
        will-change: transform, opacity;
        contain: paint;
        backface-visibility: hidden;
      }

      @keyframes rippleOutPatched {
        0% {
          transform: translate3d(-50%, -50%, 0) scale(0);
          opacity: 0.48;
        }
        60% {
          transform: translate3d(-50%, -50%, 0) scale(var(--ripple-scale, 3));
          opacity: 0.16;
        }
        100% {
          transform: translate3d(-50%, -50%, 0) scale(calc(var(--ripple-scale, 3) * 1.12));
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function ensureRippleHost(el) {
    const computed = window.getComputedStyle(el);
    if (computed.position === 'static') {
      el.style.position = 'relative';
    }
    if (computed.overflow === 'visible') {
      el.style.overflow = 'hidden';
    }
  }

  function ensureRippleDot(el) {
    if (el._rippleDot && el._rippleDot.isConnected) return el._rippleDot;

    const dot = document.createElement('span');
    dot.className = 'ripple-dot';
    el.appendChild(dot);
    el._rippleDot = dot;
    return dot;
  }

  function getRipplePoint(rect, event) {
    if (event.touches && event.touches.length) {
      return {
        x: event.touches[0].clientX - rect.left,
        y: event.touches[0].clientY - rect.top,
      };
    }

    if (typeof event.clientX === 'number' && typeof event.clientY === 'number') {
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    }

    return {
      x: rect.width / 2,
      y: rect.height / 2,
    };
  }

  function spawnRipple(el, event) {
    ensureRippleHost(el);

    const rect = el.getBoundingClientRect();
    const point = getRipplePoint(rect, event);
    const maxX = Math.max(point.x, rect.width - point.x);
    const maxY = Math.max(point.y, rect.height - point.y);
    const scale = Math.max(1, Math.sqrt(maxX * maxX + maxY * maxY) / 18);
    const dot = ensureRippleDot(el);

    dot.style.left = point.x + 'px';
    dot.style.top = point.y + 'px';

    if (dot._rippleAnim) {
      dot._rippleAnim.cancel();
      dot._rippleAnim = null;
    }

    if (typeof dot.animate === 'function') {
      const anim = dot.animate(
        [
          {
            transform: 'translate3d(-50%, -50%, 0) scale(0)',
            opacity: 0.48,
          },
          {
            offset: 0.6,
            transform: `translate3d(-50%, -50%, 0) scale(${scale})`,
            opacity: 0.16,
          },
          {
            transform: `translate3d(-50%, -50%, 0) scale(${scale * 1.12})`,
            opacity: 0,
          },
        ],
        {
          duration: RIPPLE_MS,
          easing: RIPPLE_EASING,
          fill: 'both',
        }
      );
      dot._rippleAnim = anim;

      anim.finished.then(
        function () {
          if (dot._rippleAnim === anim) dot._rippleAnim = null;
        },
        function () {
          if (dot._rippleAnim === anim) dot._rippleAnim = null;
        }
      );
      return;
    }

    dot.style.setProperty('--ripple-scale', scale.toFixed(3));
    dot.style.animation = 'none';
    void dot.offsetWidth;
    dot.style.animation = `rippleOutPatched ${RIPPLE_MS}ms ${RIPPLE_EASING} forwards`;
  }

  document.addEventListener(
    'pointerdown',
    function (event) {
      if (event.button && event.button !== 0) return;
      if (event.isPrimary === false) return;

      const target = event.target.closest(RIPPLE_SEL);
      if (!target) return;

      spawnRipple(target, event);
    },
    { passive: true }
  );
})();
