(function(){
  'use strict';

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
    '#btn-twist-ok'
  ].join(',');

  function spawnRipple(el, e) {
    const rect = el.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    let x;
    let y;
    if (e.touches && e.touches.length) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else if (typeof e.clientX === 'number') {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    } else {
      x = rect.width / 2;
      y = rect.height / 2;
    }

    const old = el.querySelector('.ripple-dot');
    if (old) old.remove();

    const dot = document.createElement('span');
    dot.className = 'ripple-dot';
    dot.style.left = x + 'px';
    dot.style.top = y + 'px';

    const maxDim = Math.max(rect.width, rect.height);
    const scale = Math.max(2.1, (maxDim / 36) * 2);
    dot.style.setProperty('--ripple-scale', scale.toFixed(2));

    el.appendChild(dot);
    dot.addEventListener('animationend', () => dot.remove(), { once: true });
  }

  document.addEventListener('pointerdown', function(e) {
    if (typeof e.button === 'number' && e.button !== 0) return;
    const target = e.target.closest(RIPPLE_SEL);
    if (!target) return;
    spawnRipple(target, e);
  }, { passive: true });
})();
