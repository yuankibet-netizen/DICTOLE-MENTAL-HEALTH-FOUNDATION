/* ========================================
   DICTOLE - Modern Interactive Scripts
   ======================================== */

// ========== PAGE LOAD & GSAP ANIMATIONS (fallback if cinematic.js not loaded) ==========
document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger === 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    try {
      gsap.fromTo('.page-load', { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' });
      gsap.fromTo('.hero-content', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out' });
      gsap.fromTo('.hero-content .btn', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.8, stagger: 0.1, ease: 'power2.out' });
    } catch (_) {}
  }
});

// ========== HAMBURGER MENU (Mobile) ==========
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');

if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
    document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
  });

  // Close menu when clicking a nav link (mobile)
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      nav.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('active')) {
      hamburger.classList.remove('active');
      nav.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// ========== HEADER SCROLL EFFECT ==========
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header?.classList.add('scrolled');
  } else {
    header?.classList.remove('scrolled');
  }
});

// ========== SCROLL REVEAL ANIMATIONS ==========
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);

revealElements.forEach((el) => revealObserver.observe(el));

// ========== MISSION 3D – Mouse-follow + Click to rotate (glasses suspended) ==========
const missionWrapper = document.getElementById('mission3dWrapper');
const missionCarousel = document.getElementById('mission3dCarousel');
const missionCards = document.querySelectorAll('.mission-card');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (missionWrapper && missionCarousel && !prefersReducedMotion) {
  let mouseX = 0.5, mouseY = 0.5;
  let targetRotateX = 0, targetRotateY = 0;
  let currentRotateX = 0, currentRotateY = 0;

  missionWrapper.addEventListener('mousemove', (e) => {
    const rect = missionWrapper.getBoundingClientRect();
    mouseX = (e.clientX - rect.left) / rect.width;
    mouseY = (e.clientY - rect.top) / rect.height;
    targetRotateX = (mouseY - 0.5) * -20;
    targetRotateY = (mouseX - 0.5) * 25;
  });

  missionWrapper.addEventListener('mouseleave', () => {
    targetRotateX = 0;
    targetRotateY = 0;
  });

  function animate3d() {
    currentRotateX += (targetRotateX - currentRotateX) * 0.08;
    currentRotateY += (targetRotateY - currentRotateY) * 0.08;
    missionCarousel.style.transform = `
      rotateX(${currentRotateX}deg) 
      rotateY(${currentRotateY}deg) 
      translateZ(0)
    `;
    requestAnimationFrame(animate3d);
  }
  animate3d();

  // Click to rotate each card like suspended glasses
  missionCards.forEach((card) => {
    const inner = card.querySelector('.mission-card-inner');
    if (!inner) return;
    card.style.cursor = 'pointer';
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', 'Rotate card');
    const spin = () => {
      if (card.classList.contains('mission-spin')) return;
      card.classList.add('mission-spin');
      const onEnd = () => card.classList.remove('mission-spin');
      inner.addEventListener('animationend', onEnd, { once: true });
    };
    card.addEventListener('click', (e) => { e.preventDefault(); spin(); });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); spin(); }
    });
  });
}

// ========== SMOOTH SCROLLING (fallback when cinematic.js not loaded) ==========
if (typeof ScrollTrigger === 'undefined') {
  document.querySelectorAll('nav a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || !href) return;
      if (this.dataset.panel && this.dataset.panel !== 'none') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ========== INPUT SANITIZATION ==========
function sanitizeInput(str, maxLen = 2000) {
  if (typeof str !== 'string') return '';
  return str.replace(/[<>"']/g, '').slice(0, maxLen).trim();
}

// ========== FORM SUBMISSION ==========
const EMAIL_ENDPOINTS = ['/api/send-email'];

async function submitContactForm(data) {
  let lastError = 'Failed to send. Please try again or call +2547 90076248.';
  for (const url of EMAIL_ENDPOINTS) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json().catch(() => ({}));
      if (res.ok) return result;
      lastError = result.error || 'Server error.';
      if (res.status === 404) continue;
      throw new Error(lastError);
    } catch (err) {
      if (err.message && !err.message.includes('Server') && !err.message.includes('Cannot reach')) {
        throw err;
      }
      if (err.name === 'TypeError' || err.message?.includes('fetch')) {
        // Silently handle fetch errors on static hosting
        continue;
      }
      lastError = err.message || lastError;
    }
  }
  throw new Error(lastError);
}

function setFormState(form, state) {
  const btn = form.querySelector('button[type="submit"]');
  if (!btn) return;
  if (state === 'loading') {
    btn.disabled = true;
    btn.dataset.originalText = btn.textContent;
    btn.textContent = 'Sending...';
  } else {
    btn.disabled = false;
    btn.textContent = btn.dataset.originalText || 'Send Message';
  }
}

function showFormFeedback(form, type, message) {
  let el = form.querySelector('.form-feedback');
  if (!el) {
    el = document.createElement('div');
    el.className = 'form-feedback';
    form.insertBefore(el, form.firstChild);
  }
  el.textContent = message;
  el.className = 'form-feedback form-feedback--' + type;
  el.setAttribute('role', 'alert');
  setTimeout(() => el.remove(), 5000);
}

// ========== CONTACT FORM ==========
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const name = sanitizeInput(String(formData.get('name') || ''), 100);
    const email = sanitizeInput(String(formData.get('email') || ''), 254);
    const message = sanitizeInput(String(formData.get('message') || ''), 5000);

    if (!name || !email || !message) {
      showFormFeedback(this, 'error', 'Please fill in all required fields.');
      return;
    }

    setFormState(this, 'loading');
    try {
      await submitContactForm({ name, email, message });
      showFormFeedback(this, 'success', 'Message sent! We’ll get back to you soon.');
      this.reset();
    } catch (err) {
      showFormFeedback(this, 'error', err.message || 'Something went wrong. Please try again or call us directly.');
    } finally {
      setFormState(this, 'idle');
    }
  });
}

// ========== DISPUTE FORM ==========
const disputeForm = document.getElementById('dispute-form');
if (disputeForm) {
  disputeForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const name = sanitizeInput(String(formData.get('name') || ''), 100);
    const email = sanitizeInput(String(formData.get('email') || ''), 254);
    const orderId = sanitizeInput(String(formData.get('orderId') || ''), 100);
    const dispute = sanitizeInput(String(formData.get('dispute') || ''), 3000);

    if (!name || !email || !dispute) {
      showFormFeedback(this, 'error', 'Please fill in name, email, and dispute details.');
      return;
    }

    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn?.textContent;
    if (btn) { btn.disabled = true; btn.textContent = 'Submitting...'; }
    try {
      await submitContactForm({ formType: 'dispute', name, email, orderId, dispute });
      showFormFeedback(this, 'success', 'Dispute submitted. We’ll review and respond soon.');
      this.reset();
    } catch (err) {
      showFormFeedback(this, 'error', err.message || 'Failed to submit. Please try again.');
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = originalText; }
    }
  });
}

// ========== APPOINTMENT FORM ==========
const appointmentForm = document.getElementById('appointment-form');
if (appointmentForm) {
  const dateInput = appointmentForm.querySelector('input[name="date"]');
  if (dateInput) {
    const today = new Date().toISOString().slice(0, 10);
    dateInput.setAttribute('min', today);
  }
  appointmentForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const name = sanitizeInput(String(formData.get('name') || ''), 100);
    const email = sanitizeInput(String(formData.get('email') || ''), 254);
    const phone = sanitizeInput(String(formData.get('phone') || ''), 20);
    const service = formData.get('service') || '';
    const date = formData.get('date') || '';
    const time = formData.get('time') || '';
    const message = sanitizeInput(String(formData.get('message') || ''), 1000);

    if (!name || !email || !service || !date) {
      alert('Please fill in name, email, service, and date.');
      return;
    }

    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn?.textContent;
    if (btn) { btn.disabled = true; btn.textContent = 'Sending...'; }

    try {
      await submitContactForm({ formType: 'appointment', name, email, phone, service, date, time, message });

      showFormFeedback(this, 'success', 'Booking request sent successfully! We\'ll confirm your appointment by phone or email within 24 hours.');

      this.reset();
      if (dateInput) dateInput.setAttribute('min', new Date().toISOString().slice(0, 10));

      setTimeout(() => {
        const panel = document.getElementById('panel-appointment');
        if (panel && typeof closePanel === 'function') closePanel(panel);
      }, 2500);

    } catch (error) {
      console.error('Appointment booking error:', error);
      alert('Failed to send booking request. Please try again or call us directly at +2547 90076248.');
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = originalText; }
    }
  });
}

// ========== NEWSLETTER FORM ==========
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = sanitizeInput(String(new FormData(this).get('email') || ''), 254);
    if (!email) return;
    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn?.textContent;
    if (btn) { btn.disabled = true; btn.textContent = 'Subscribing...'; }
    try {
      await submitContactForm({ formType: 'newsletter', email });
      const fb = document.createElement('p');
      fb.className = 'form-feedback form-feedback--success';
      fb.style.marginTop = '12px';
      fb.textContent = 'Thank you! You\'re subscribed.';
      this.appendChild(fb);
      this.reset();
      setTimeout(() => fb.remove(), 5000);
    } catch (err) {
      const fb = document.createElement('p');
      fb.className = 'form-feedback form-feedback--error';
      fb.style.marginTop = '12px';
      fb.textContent = err.message || 'Subscription failed. Please try again.';
      this.appendChild(fb);
      setTimeout(() => fb.remove(), 5000);
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = originalText; }
    }
  });
}

// ========== RATING SYSTEM ==========
let selectedRating = 0;
const stars = document.querySelectorAll('.star');
const ratingComment = document.getElementById('rating-comment');
const submitRatingBtn = document.getElementById('submit-rating');

stars?.forEach((star) => {
  star.addEventListener('click', () => {
    selectedRating = parseInt(star.dataset.rating);
    stars.forEach((s) => s.classList.remove('active'));
    for (let i = 0; i < selectedRating; i++) stars[i].classList.add('active');
  });
});

submitRatingBtn?.addEventListener('click', () => {
  if (selectedRating === 0) {
    alert('Please select a rating first.');
    return;
  }
  const comment = ratingComment?.value || '';
  const subject = 'Service Rating';
  const body = `Rating: ${selectedRating} stars\nComment: ${comment}`;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=dictolementalhealthfoundation@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.open(gmailUrl, '_blank');
  alert('Thank you for your rating!');
  selectedRating = 0;
  stars?.forEach((s) => s.classList.remove('active'));
  if (ratingComment) ratingComment.value = '';
});

// ========== PICTORIAL GALLERY ANIMATIONS ==========
document.addEventListener('DOMContentLoaded', function() {
  // GSAP gallery hover animations for pictorial panel
  const galleryItems = document.querySelectorAll('.pictorial-gallery .gallery-item');
  
  galleryItems.forEach(item => {
    const img = item.querySelector('img');
    if (!img) return;
    
    item.addEventListener('mouseenter', () => {
      if (typeof gsap !== 'undefined') {
        gsap.to(img, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
        gsap.to(item, { 
          y: -5, 
          duration: 0.3, 
          ease: 'power2.out',
          boxShadow: '0 15px 30px rgba(212, 175, 55, 0.3)'
        });
      }
    });
    
    item.addEventListener('mouseleave', () => {
      if (typeof gsap !== 'undefined') {
        gsap.to(img, { scale: 1, duration: 0.3, ease: 'power2.out' });
        gsap.to(item, { 
          y: 0, 
          duration: 0.3, 
          ease: 'power2.out',
          boxShadow: '0 0 0 transparent'
        });
      }
    });
    
    // Click to view larger image (optional enhancement)
    item.addEventListener('click', function() {
      const imgSrc = img.src;
      const alt = img.alt;
      
      // Create lightbox effect
      const lightbox = document.createElement('div');
      lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
      `;
      
      const largeImg = document.createElement('img');
      largeImg.src = imgSrc;
      largeImg.alt = alt;
      largeImg.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        border-radius: 12px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        transform: scale(0.9);
        transition: transform 0.3s ease;
      `;
      
      lightbox.appendChild(largeImg);
      document.body.appendChild(lightbox);
      
      // Animate in
      setTimeout(() => {
        lightbox.style.opacity = '1';
        largeImg.style.transform = 'scale(1)';
      }, 10);
      
      // Close on click
      lightbox.addEventListener('click', function() {
        lightbox.style.opacity = '0';
        largeImg.style.transform = 'scale(0.9)';
        setTimeout(() => {
          document.body.removeChild(lightbox);
        }, 300);
      });
      
      // Close on escape key
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          lightbox.click();
          document.removeEventListener('keydown', handleEscape);
        }
      };
      document.addEventListener('keydown', handleEscape);
    });
  });
  
  // Reveal animations for gallery items when panel opens
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Stagger animation for gallery items
        const items = Array.from(document.querySelectorAll('.pictorial-gallery .gallery-item'));
        items.forEach((item, index) => {
          if (typeof gsap !== 'undefined') {
            gsap.fromTo(item, 
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.6, delay: index * 0.1, ease: 'power2.out' }
            );
          }
        });
      }
    });
  }, observerOptions);
  
  // Observe the pictorial panel
  const pictorialPanel = document.getElementById('panel-pictorial');
  if (pictorialPanel) {
    galleryObserver.observe(pictorialPanel);
  }
});

// ========== ACTIVE NAV HIGHLIGHT ==========
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  let current = '';
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
});

// ========== SEARCH FUNCTIONALITY (placeholder - extend as needed) ==========
const searchInput = document.querySelector('.search-bar input');
const searchBtn = document.querySelector('.search-bar button');

searchBtn?.addEventListener('click', () => {
  const query = searchInput?.value?.trim();
  if (query) {
    // Scroll to services and could filter/highlight - extend as needed
    document.querySelector('#program')?.scrollIntoView({ behavior: 'smooth' });
  }
});

if (searchInput) {
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && searchBtn) searchBtn.click();
  });
}
