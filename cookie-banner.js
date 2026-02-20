/* ========================================
   DICTOLE - Cookie Consent Banner
   ======================================== */

(function () {
  'use strict';

  const STORAGE_KEY = 'dictole-cookies';
  const banner = document.getElementById('cookie-banner');

  if (!banner) {
    console.error('Cookie banner element not found');
    return;
  }

  function hideBanner() {
    console.log('Hiding cookie banner');
    banner.classList.remove('visible');
    setTimeout(() => {
      banner.style.display = 'none';
    }, 400);
  }

  function showBanner() {
    console.log('Showing cookie banner');
    banner.style.display = 'block';
    banner.hidden = false;
    requestAnimationFrame(() => banner.classList.add('visible'));
  }

  function accept() {
    console.log('Cookie consent accepted');
    localStorage.setItem(STORAGE_KEY, 'accepted');
    
    // Show visual feedback
    const acceptBtn = document.getElementById('cookie-accept');
    if (acceptBtn) {
      acceptBtn.textContent = 'Accepted ✓';
      acceptBtn.style.background = '#22c55e';
      acceptBtn.style.borderColor = '#22c55e';
    }
    
    // Hide banner after a short delay
    setTimeout(hideBanner, 500);
    
    // Enable analytics or other cookie-dependent features
    enableCookieFeatures();
  }

  function decline() {
    console.log('Cookie consent declined');
    localStorage.setItem(STORAGE_KEY, 'declined');
    
    // Show visual feedback
    const declineBtn = document.getElementById('cookie-decline');
    if (declineBtn) {
      declineBtn.textContent = 'Declined ✓';
      declineBtn.style.background = '#ef4444';
      declineBtn.style.borderColor = '#ef4444';
    }
    
    // Hide banner after a short delay
    setTimeout(hideBanner, 500);
    
    // Disable analytics or other cookie-dependent features
    disableCookieFeatures();
  }

  function enableCookieFeatures() {
    // Enable Google Analytics, tracking pixels, etc.
    console.log('Cookie-dependent features enabled');
    // Add your analytics initialization code here
  }

  function disableCookieFeatures() {
    // Disable analytics, tracking pixels, etc.
    console.log('Cookie-dependent features disabled');
    // Add code to disable tracking features here
  }

  function init() {
    console.log('Initializing cookie banner');
    
    const choice = localStorage.getItem(STORAGE_KEY);
    console.log('Previous cookie choice:', choice);
    
    if (!choice) {
      banner.style.display = 'none';
      banner.hidden = true;
      setTimeout(showBanner, 1500);
    } else {
      // User already made a choice, keep banner hidden
      banner.style.display = 'none';
      banner.hidden = true;
      
      // Apply previous choice
      if (choice === 'accepted') {
        enableCookieFeatures();
      } else {
        disableCookieFeatures();
      }
    }

    const acceptBtn = document.getElementById('cookie-accept');
    const declineBtn = document.getElementById('cookie-decline');

    if (acceptBtn) {
      console.log('Adding click listener to accept button');
      acceptBtn.addEventListener('click', accept);
    } else {
      console.error('Accept button not found');
    }
    
    if (declineBtn) {
      console.log('Adding click listener to decline button');
      declineBtn.addEventListener('click', decline);
    } else {
      console.error('Decline button not found');
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
