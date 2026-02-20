/* ========================================
   DICTOLE - Panel Navigation Scripts
   ======================================== */

// ========== PANEL NAVIGATION ==========
const navPanels = document.querySelectorAll('.nav-panel');
const overlayPanels = document.querySelectorAll('.overlay-panel');
const panelCloseBtns = document.querySelectorAll('.panel-close, .panel-close-text');
const panelOverlay = document.querySelector('.panel-overlay');

// Panel configurations – animation duration in ms
const panelConfigs = {
  about: { duration: 500 },
  services: { duration: 500 },
  mission: { duration: 500 },
  contact: { duration: 500 },
  appointment: { duration: 500 },
  share: { duration: 500 },
  pictorial: { duration: 500 },
  chat: { duration: 500 }
};

// Open panel function – drops/slides in
function openPanel(panelId) {
  const panel = document.getElementById(`panel-${panelId}`);
  if (!panel) {
    console.error(`Panel with ID 'panel-${panelId}' not found`);
    return;
  }

  console.log(`Opening panel: ${panelId}`);

  // Close mobile hamburger menu if open
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav');
  if (hamburger?.classList.contains('active') && nav) {
    hamburger.classList.remove('active');
    nav.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Close all other panels (but NOT the one we're opening)
  closeAllPanels(panelId);

  // Show overlay with fade
  if (panelOverlay) {
    panelOverlay.style.display = 'block';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => panelOverlay.classList.add('active'));
    });
  }

  // Show panel and trigger slide-in / drop animation
  panel.style.display = 'block';
  panel.style.visibility = 'hidden'; // prevent flash
  console.log(`Panel display set to block for: ${panelId}`);
  
  requestAnimationFrame(() => {
    panel.style.visibility = '';
    console.log(`Panel visibility cleared for: ${panelId}`);
    requestAnimationFrame(() => {
      panel.classList.add('active');
      console.log(`Panel active class added for: ${panelId}`);
    });
  });

  document.body.style.overflow = 'hidden';
  document.body.classList.add('panel-open');
}

// Close panel function – slides out / drops away
function closePanel(panel) {
  if (!panel) return;

  const panelId = panel.id.replace('panel-', '');
  const duration = panelConfigs[panelId]?.duration || 500;

  // Trigger exit animation (remove active → transform animates back)
  panel.classList.remove('active');

  setTimeout(() => {
    panel.style.display = 'none';

    const activePanels = document.querySelectorAll('.overlay-panel.active');
    if (activePanels.length === 0) {
      document.body.classList.remove('panel-open');
      if (panelOverlay) {
        panelOverlay.classList.remove('active');
        setTimeout(() => { panelOverlay.style.display = 'none'; }, 350);
      }
      document.body.style.overflow = '';
    }
  }, duration);
}

// Close all panels, optionally excluding one (e.g. the one we're about to open)
function closeAllPanels(exceptPanelId) {
  overlayPanels.forEach(panel => {
    const id = panel.id.replace('panel-', '');
    if (id !== exceptPanelId) closePanel(panel);
  });
}

// Navigation panel clicks – open panel with drop/slide animation, or allow scroll (Home)
navPanels.forEach(link => {
  link.addEventListener('click', (e) => {
    const panelId = link.dataset.panel;
    if (panelId && panelId !== 'none') {
      e.preventDefault();
      openPanel(panelId);
    }
    // Home (data-panel="none") – allow default scroll to #home
  });
});

// Panel close buttons (X and "Close" text)
panelCloseBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const panel = btn.closest('.overlay-panel');
    if (panel) closePanel(panel);
  });
});

// Overlay click to close (no args – close all)
if (panelOverlay) {
  panelOverlay.addEventListener('click', () => closeAllPanels());
}

// Escape key to close panels
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const activePanel = document.querySelector('.overlay-panel.active');
    if (activePanel) {
      closePanel(activePanel);
    }
  }
});

// Panel contact form handler
const panelContactForm = document.getElementById('panel-contact-form');
if (panelContactForm && typeof submitContactForm === 'function') {
  panelContactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const name = sanitizeInput(String(formData.get('name') || ''), 100);
    const email = sanitizeInput(String(formData.get('email') || ''), 254);
    const message = sanitizeInput(String(formData.get('message') || ''), 5000);

    if (!name || !email || !message) {
      const fb = this.querySelector('.form-feedback') || document.createElement('div');
      fb.className = 'form-feedback form-feedback--error';
      fb.textContent = 'Please fill in all fields.';
      if (!this.querySelector('.form-feedback')) this.insertBefore(fb, this.firstChild);
      return;
    }

    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn?.textContent;
    if (btn) { btn.disabled = true; btn.textContent = 'Sending...'; }
    try {
      await submitContactForm({ name, email, message, formType: 'panel' });
      this.reset();
      closePanel(document.getElementById('panel-contact'));
      if (btn) { btn.disabled = false; btn.textContent = originalText; }
    } catch (err) {
      const fb = this.querySelector('.form-feedback') || document.createElement('div');
      fb.className = 'form-feedback form-feedback--error';
      fb.textContent = err.message || 'Failed to send. Please try again.';
      if (!this.querySelector('.form-feedback')) this.insertBefore(fb, this.firstChild);
      if (btn) { btn.disabled = false; btn.textContent = originalText; }
    }
  });
}
