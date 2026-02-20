/* ========================================
   DICTOLE - Canvas Background Effect
   Organic gradient mesh + floating orbs
   using brand colors & page images
   ======================================== */

(function () {
  'use strict';

  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationId;
  const loadedImages = [];
  const imageUrls = ['IMG-20260215-WA0005.jpg', 'IMG-20260215-WA0006.jpg', 'IMG-20260215-WA0007.jpg'];

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.scale(dpr, dpr);
  }

  const blobs = [];
  const colors = [
    { r: 212, g: 175, b: 55, a: 0.12 },
    { r: 9, g: 80, b: 30, a: 0.15 },
    { r: 232, g: 201, b: 90, a: 0.06 },
    { r: 11, g: 11, b: 11, a: 0.35 }
  ];

  function initBlobs() {
    blobs.length = 0;
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    for (let i = 0; i < 6; i++) {
      blobs.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: 100 + Math.random() * 150,
        color: colors[i % colors.length],
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  function drawBlob(blob, t) {
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    blob.x += blob.vx;
    blob.y += blob.vy;
    if (blob.x < -blob.radius) blob.x = w + blob.radius;
    if (blob.x > w + blob.radius) blob.x = -blob.radius;
    if (blob.y < -blob.radius) blob.y = h + blob.radius;
    if (blob.y > h + blob.radius) blob.y = -blob.radius;

    const gradient = ctx.createRadialGradient(
      blob.x, blob.y, 0,
      blob.x, blob.y, blob.radius
    );
    const c = blob.color;
    const pulse = 1 + Math.sin(t * 0.0015 + blob.phase) * 0.2;
    gradient.addColorStop(0, `rgba(${c.r},${c.g},${c.b},${c.a * pulse})`);
    gradient.addColorStop(0.5, `rgba(${c.r},${c.g},${c.b},${c.a * 0.6})`);
    gradient.addColorStop(1, 'rgba(11,11,11,0)');

    ctx.beginPath();
    ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
  }

  function drawImageLayers(t) {
    if (loadedImages.length === 0) return;
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    loadedImages.forEach((img, i) => {
      if (!img.complete) return;
      const offset = (t * 0.02 + i * 100) % (w + 200) - 100;
      ctx.save();
      ctx.globalAlpha = 0.04 + Math.sin(t * 0.0008 + i) * 0.02;
      const scale = 1.8;
      const sw = w * scale;
      const sh = (img.height / img.width) * sw;
      ctx.drawImage(img, offset - sw / 4, (h - sh) / 2 + Math.sin(t * 0.0005 + i * 0.7) * 20, sw, sh);
      ctx.restore();
    });
  }

  function loop(t) {
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    ctx.clearRect(0, 0, w, h);
    drawImageLayers(t);
    blobs.forEach(b => drawBlob(b, t));
    animationId = requestAnimationFrame(loop);
  }

  function start() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    resize();
    initBlobs();
    imageUrls.forEach((url) => {
      const img = new Image();
      img.onload = () => loadedImages.push(img);
      img.src = url;
    });
    animationId = requestAnimationFrame(loop);
  }

  window.addEventListener('resize', () => {
    resize();
    initBlobs();
  });

  start();
})();
