/* ========================================
   DICTOLE - Canvas Background Effect
   DISABLED - Hero section animations removed
   ======================================== */

(function () {
  'use strict';

  // Canvas background animation disabled for hero section
  // Static background now used instead
  console.log('Canvas hero animations disabled');
  
  const canvas = document.getElementById('hero-canvas');
  if (canvas) {
    canvas.style.display = 'none';
  }
})();
