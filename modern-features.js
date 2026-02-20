/* ========================================
   DICTOLE - Modern Features
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
  // Skip if cinematic.js (GSAP) handles these
  if (typeof ScrollTrigger === 'undefined') {
    initMagneticButtons();
    initParallaxEffects();
  }
  init3DCards();
});

// Magnetic Button Effect
function initMagneticButtons() {
  const magneticBtns = document.querySelectorAll('.magnetic-btn');
  
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const distance = Math.sqrt(x * x + y * y);
      const maxDistance = 100;
      const strength = Math.max(0, 1 - distance / maxDistance);
      
      const moveX = x * strength * 0.3;
      const moveY = y * strength * 0.3;
      
      this.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + strength * 0.05})`;
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translate(0, 0) scale(1)';
    });
  });
}

// Parallax Effects
function initParallaxEffects() {
  const heroSection = document.querySelector('.hero');
  const floatingCards = document.querySelectorAll('.floating-card');
  
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallaxSpeed = 0.5;
      
      // Parallax for hero background
      const heroContent = heroSection.querySelector('.hero-content');
      if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
      }
      
      // Enhanced floating card movement
      floatingCards.forEach((card, index) => {
        const speed = 0.3 + (index * 0.1);
        const yPos = -(scrolled * speed);
        const xPos = Math.sin(scrolled * 0.001 + index) * 20;
        card.style.transform = `translate(${xPos}px, ${yPos}px) rotateX(${scrolled * 0.01}deg) rotateY(${scrolled * 0.02}deg)`;
      });
    });
  }
}

// 3D Card Interactions for mission-card and panel-card
function init3DCards() {
  const cards = document.querySelectorAll('.mission-card, .panel-card');
  const floatingCards = typeof ScrollTrigger === 'undefined' ? document.querySelectorAll('.floating-card') : [];
  const allCards = [...cards, ...floatingCards];
  
  allCards.forEach(card => {
    card.addEventListener('mouseenter', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const rotateX = (y / rect.height) * -20;
      const rotateY = (x / rect.width) * 20;
      
      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
      this.style.boxShadow = '0 20px 40px rgba(212, 175, 55, 0.4)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
      this.style.boxShadow = '';
    });
  });
}

// Enhanced Scroll Reveal
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  reveals.forEach(element => {
    revealObserver.observe(element);
  });
}

// Add shimmer effect to text
function addShimmerEffect() {
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    heroTitle.style.backgroundSize = '200% 100%';
    heroTitle.style.backgroundPosition = '0% 50%';
    
    setInterval(() => {
      const current = heroTitle.style.backgroundPosition;
      if (current === '0% 50%') {
        heroTitle.style.backgroundPosition = '100% 50%';
      } else {
        heroTitle.style.backgroundPosition = '0% 50%';
      }
    }, 3000);
  }
}

// Initialize all modern features
initScrollReveal();
addShimmerEffect();

console.log('Modern features initialized successfully!');
