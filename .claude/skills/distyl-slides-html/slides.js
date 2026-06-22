// Distyl Academy slide runtime.
// 1. Fits each 1920x1080 frame inside the viewport via transform: scale().
// 2. Adds keyboard navigation: arrows, PgUp/PgDn, Home/End. F toggles fullscreen.

(function () {
  function fit() {
    document.querySelectorAll('.slide-frame').forEach(function (frame) {
      var slide = frame.parentElement;
      var sx = slide.clientWidth / 1920;
      var sy = slide.clientHeight / 1080;
      var s = Math.min(sx, sy);
      frame.style.transform = 'translate(-50%, -50%) scale(' + s + ')';
    });
  }

  function slides() {
    return Array.prototype.slice.call(document.querySelectorAll('.slide'));
  }

  function currentIndex() {
    var y = window.scrollY;
    var h = window.innerHeight;
    return Math.round(y / h);
  }

  function go(i) {
    var all = slides();
    if (i < 0) i = 0;
    if (i >= all.length) i = all.length - 1;
    all[i].scrollIntoView({ behavior: 'smooth' });
  }

  window.addEventListener('resize', fit);
  window.addEventListener('load', fit);
  document.addEventListener('DOMContentLoaded', fit);

  document.addEventListener('keydown', function (e) {
    if (e.target && /input|textarea/i.test(e.target.tagName)) return;
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
      case 'PageDown':
      case ' ':
        e.preventDefault();
        go(currentIndex() + 1);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
      case 'PageUp':
        e.preventDefault();
        go(currentIndex() - 1);
        break;
      case 'Home':
        e.preventDefault();
        go(0);
        break;
      case 'End':
        e.preventDefault();
        go(slides().length - 1);
        break;
      case 'f':
      case 'F':
        e.preventDefault();
        if (document.fullscreenElement) document.exitFullscreen();
        else document.documentElement.requestFullscreen();
        break;
    }
  });
})();
