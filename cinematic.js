/* ========================================
   DICTOLE - Cinematic Motion & Interactions
   Scroll, Panels, Mouse effects
   ======================================== */

(function() {
  'use strict';
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  gsap.registerPlugin(ScrollTrigger);

  // ========== CINEMATIC PAGE LOAD ==========
  document.addEventListener('DOMContentLoaded', () => {
    gsap.fromTo('.page-load', { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.out' });
    gsap.fromTo('.hero-content', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.2, delay: 0.2, ease: 'power3.out' });
    gsap.fromTo('.hero-content h1', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, delay: 0.5, ease: 'power3.out' });
    gsap.fromTo('.hero-content p', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.7, ease: 'power2.out' });
    gsap.fromTo('.hero-content .btn', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.95, stagger: 0.08, ease: 'back.out(1.2)' });
    gsap.fromTo('.floating-card', { opacity: 0, scale: 0.8, y: 40 }, { opacity: 1, scale: 1, y: 0, duration: 1, delay: 0.6, stagger: 0.12, ease: 'power3.out' });
  });

  // ========== SCROLL-TRIGGERED REVEALS (Cinematic) ==========
  gsap.utils.toArray('.reveal').forEach((el, i) => {
    gsap.fromTo(el, 
      { opacity: 0, y: 60 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // ========== PARALLAX HERO BACKGROUND ==========
  const hero = document.querySelector('.hero');
  const heroBg = document.querySelector('.hero-bg-image');
  const heroContent = document.querySelector('.hero-content');
  if (hero && heroBg) {
    gsap.to(heroBg, {
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2
      },
      yPercent: 25,
      ease: 'none'
    });
  }
  if (hero && heroContent) {
    gsap.to(heroContent, {
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8
      },
      y: 80,
      opacity: 0.7,
      ease: 'none'
    });
  }

  // ========== SECTION PARALLAX (subtle depth) ==========
  gsap.utils.toArray('.section').forEach((section, i) => {
    const overlay = section.querySelector('.section-overlay');
    if (overlay) {
      gsap.to(overlay, {
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5
        },
        opacity: 0.6,
        ease: 'none'
      });
    }
  });

  // ========== CINEMATIC MAGNETIC BUTTONS ==========
  document.querySelectorAll('.magnetic-btn, .btn, nav a, .panel-close, .panel-close-text').forEach(btn => {
    if (!btn.closest('.hamburger')) {
      btn.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
        gsap.to(this, { 
          x: x * 8, 
          y: y * 6, 
          duration: 0.35, 
          ease: 'power2.out' 
        });
      });
      btn.addEventListener('mouseleave', function() {
        gsap.to(this, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
      });
    }
  });

  // ========== FLOATING CARDS - MOUSE TILT ==========
  document.querySelectorAll('.floating-card').forEach(card => {
    card.style.pointerEvents = 'auto';
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      gsap.to(this, {
        rotateX: -y * 12,
        rotateY: x * 15,
        scale: 1.08,
        boxShadow: '0 20px 50px rgba(212, 175, 55, 0.25)',
        duration: 0.35,
        ease: 'power2.out'
      });
    });
    card.addEventListener('mouseleave', function() {
      gsap.to(this, { 
        rotateX: 0, 
        rotateY: 0, 
        scale: 1, 
        boxShadow: '',
        duration: 0.5, 
        ease: 'power2.out' 
      });
    });
  });

  // ========== PANEL CINEMATIC ANIMATIONS ==========
  const origOpen = typeof openPanel === 'function' ? openPanel : null;
  const origClose = typeof closePanel === 'function' ? closePanel : null;

  if (origOpen) {
    window.openPanel = function(panelId) {
      const panel = document.getElementById('panel-' + panelId);
      if (!panel) { origOpen(panelId); return; }
      const overlay = document.querySelector('.panel-overlay');
      const content = panel.querySelector('.panel-content');
      const hamburger = document.querySelector('.hamburger');
      const nav = document.querySelector('nav');
      if (hamburger?.classList.contains('active') && nav) {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = '';
      }
      if (typeof closeAllPanels === 'function') closeAllPanels(panelId);
      if (overlay) {
        overlay.style.display = 'block';
        gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' });
        overlay.classList.add('active');
      }
      panel.style.display = 'block';
      panel.style.visibility = 'visible';
      panel.style.transition = 'none';
      const from = getPanelStartState(panelId);
      gsap.fromTo(panel, from, {
        opacity: 1,
        xPercent: -50,
        yPercent: -50,
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: 'back.out(1.15)'
      });
      if (content) {
        gsap.fromTo(content, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.55, delay: 0.25, ease: 'power3.out' });
      }
      document.body.style.overflow = 'hidden';
      document.body.classList.add('panel-open');
    };
  }

  function getPanelStartState(panelId) {
    const v = 120;
    const map = {
      about: { xPercent: -50, yPercent: -50, x: 0, y: -v, scale: 0.9, opacity: 0 },
      services: { xPercent: -50, yPercent: -50, x: v, y: 0, scale: 0.9, opacity: 0 },
      mission: { xPercent: -50, yPercent: -50, x: -v, y: 0, scale: 0.9, opacity: 0 },
      appointment: { xPercent: -50, yPercent: -50, x: 0, y: v, scale: 0.9, opacity: 0 },
      contact: { xPercent: -50, yPercent: -50, x: 0, y: v, scale: 0.9, opacity: 0 },
      share: { xPercent: -50, yPercent: -50, x: 0, y: v, scale: 0.9, opacity: 0 },
      pictorial: { xPercent: -50, yPercent: -50, x: 0, y: v, scale: 0.9, opacity: 0 },
      chat: { xPercent: -50, yPercent: -50, x: 0, y: v, scale: 0.9, opacity: 0 }
    };
    return map[panelId] || { xPercent: -50, yPercent: -50, x: 0, y: v, scale: 0.9, opacity: 0 };
  }

  if (origClose) {
    window.closePanel = function(panel) {
      if (!panel) return;
      const content = panel.querySelector('.panel-content');
      gsap.to(content, { opacity: 0, y: -20, duration: 0.25, ease: 'power2.in' });
      gsap.to(panel, {
        opacity: 0,
        scale: 0.92,
        xPercent: -50,
        yPercent: -50,
        x: 0,
        y: 0,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => {
          panel.style.display = 'none';
          document.body.classList.remove('panel-open');
          document.body.style.overflow = '';
          const overlay = document.querySelector('.panel-overlay');
          if (overlay) {
            gsap.to(overlay, { opacity: 0, duration: 0.3, onComplete: () => {
              overlay.classList.remove('active');
              overlay.style.display = 'none';
            }});
          }
        }
      });
    };
  }

  // ========== SMOOTH SCROLL (cinematic easing) ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || !href || this.dataset.panel) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const y = target.getBoundingClientRect().top + window.scrollY - 72;
        const start = window.scrollY;
        const dist = y - start;
        const startTime = performance.now();
        const dur = 1200;
        function easeInOutCubic(t) {
          return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }
        function scrollStep(now) {
          const elapsed = now - startTime;
          const prog = Math.min(elapsed / dur, 1);
          window.scrollTo(0, start + dist * easeInOutCubic(prog));
          if (prog < 1) requestAnimationFrame(scrollStep);
        }
        requestAnimationFrame(scrollStep);
      }
    });
  });

  // ========== CURSOR GLOW (subtle, desktop only) ==========
  if (window.innerWidth > 768 && !('ontouchstart' in window)) {
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    glow.setAttribute('aria-hidden', 'true');
    document.body.appendChild(glow);
    let x = 0, y = 0, tx = 0, ty = 0;
    document.addEventListener('mousemove', (e) => { x = e.clientX; y = e.clientY; });
    function tick() {
      tx += (x - tx) * 0.08;
      ty += (y - ty) * 0.08;
      glow.style.left = tx + 'px';
      glow.style.top = ty + 'px';
      requestAnimationFrame(tick);
    }
    tick();
  }

  console.log('Cinematic effects initialized');
})();
