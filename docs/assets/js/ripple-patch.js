/* ═══════════════════════════════════════════════════════════════
   RIPPLE ENGINE PATCH — paste this as a <script> AFTER game.js
   ═══════════════════════════════════════════════════════════════ */
(function(){
  'use strict';

  // Selectors that get ripple treatment
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

  function spawnRipple(el, e) {
    const rect = el.getBoundingClientRect();

    // pointer position relative to element
    let x, y;
    if (e.touches && e.touches.length) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else if (typeof e.clientX === 'number') {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    } else {
      // keyboard / synthetic — center
      x = rect.width / 2;
      y = rect.height / 2;
    }

    const dot = document.createElement('span');
    dot.className = 'ripple-dot';
    dot.style.left = x + 'px';
    dot.style.top  = y + 'px';

    // Scale ripple to cover the whole button
    const maxDim = Math.max(rect.width, rect.height);
    const scale  = (maxDim / 36) * 2.2; // 36px base size in CSS
    dot.style.setProperty('--ripple-scale', scale);

    el.appendChild(dot);
    dot.addEventListener('animationend', () => dot.remove(), { once: true });
  }

  // Delegate from document — never need to re-bind on DOM changes
  document.addEventListener('pointerdown', function(e) {
    const target = e.target.closest(RIPPLE_SEL);
    if (!target) return;
    spawnRipple(target, e);
  }, { passive: true });

})();
