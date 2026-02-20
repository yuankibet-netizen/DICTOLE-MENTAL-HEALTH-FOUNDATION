/* ========================================
   DICTOLE - Enhanced Mission/Vision Section
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
  // Mission card interactions
  const missionCards = document.querySelectorAll('.mission-card-enhanced');
  const progressSegments = document.querySelectorAll('.progress-segment');
  const missionCentralCard = document.querySelector('.mission-central-card');
  const missionTitle = document.querySelector('.mission-title');
  const missionSubtitle = document.querySelector('.mission-subtitle');
  
  // Mission content data
  const missionContent = {
    mission: {
      title: 'Our Mission',
      subtitle: 'Empowering communities through mental health awareness',
      icon: '🎯',
      quote: 'Together, we can break the stigma surrounding mental health.'
    },
    vision: {
      title: 'Our Vision',
      subtitle: 'A world where mental wellness is accessible to all',
      icon: '🔮',
      quote: 'Every mind deserves the chance to thrive without barriers.'
    },
    goals: {
      title: 'Our Goals',
      subtitle: 'Building supportive communities one step at a time',
      icon: '🎯',
      quote: 'Small actions create big changes in mental health advocacy.'
    },
    values: {
      title: 'Our Values',
      subtitle: 'Compassion, integrity, and empowerment guide us',
      icon: '💎',
      quote: 'We believe in treating everyone with dignity and respect.'
    }
  };
  
  // Add click handlers to mission cards
  missionCards.forEach(card => {
    card.addEventListener('click', function() {
      const missionType = this.dataset.mission;
      updateMissionDisplay(missionType);
      updateProgressIndicator(missionType);
      
      // Add active state to clicked card
      missionCards.forEach(c => c.classList.remove('active'));
      this.classList.add('active');
      
      // Add ripple effect
      createRippleEffect(this, event);
    });
    
    // Add hover sound effect (visual feedback)
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      if (!this.classList.contains('active')) {
        this.style.transform = '';
      }
    });
  });
  
  // Add click handlers to progress segments
  progressSegments.forEach(segment => {
    segment.addEventListener('click', function() {
      const missionType = this.dataset.segment;
      updateMissionDisplay(missionType);
      updateProgressIndicator(missionType);
      
      // Highlight corresponding card
      const targetCard = document.querySelector(`[data-mission="${missionType}"]`);
      if (targetCard) {
        missionCards.forEach(c => c.classList.remove('active'));
        targetCard.classList.add('active');
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });
  
  // Update mission display function
  function updateMissionDisplay(missionType) {
    const content = missionContent[missionType];
    if (!content) return;
    
    // Animate the central card change
    if (missionCentralCard) {
      missionCentralCard.style.transform = 'scale(0.95)';
      missionCentralCard.style.opacity = '0.7';
      
      setTimeout(() => {
        // Update icon
        const iconLarge = missionCentralCard.querySelector('.mission-icon-large');
        if (iconLarge) {
          iconLarge.style.transform = 'scale(0) rotate(180deg)';
          setTimeout(() => {
            iconLarge.textContent = content.icon;
            iconLarge.style.transform = 'scale(1) rotate(0deg)';
          }, 200);
        }
        
        // Update text
        if (missionTitle) missionTitle.textContent = content.title;
        if (missionSubtitle) missionSubtitle.textContent = content.subtitle;
        
        // Restore animation
        missionCentralCard.style.transform = 'scale(1)';
        missionCentralCard.style.opacity = '1';
      }, 300);
    }
    
    // Update quote display
    const quoteText = document.querySelector('.quote-text');
    const quoteAuthor = document.querySelector('.quote-author');
    if (quoteText && content.quote) {
      quoteText.style.opacity = '0';
      setTimeout(() => {
        quoteText.textContent = `"${content.quote}"`;
        quoteText.style.opacity = '1';
      }, 300);
    }
  }
  
  // Update progress indicator
  function updateProgressIndicator(missionType) {
    progressSegments.forEach(segment => {
      segment.classList.remove('active');
      if (segment.dataset.segment === missionType) {
        segment.classList.add('active');
      }
    });
  }
  
  // Create ripple effect
  function createRippleEffect(element, event) {
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.background = 'rgba(212, 175, 55, 0.5)';
    ripple.style.borderRadius = '50%';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.pointerEvents = 'none';
    ripple.style.animation = 'ripple 0.6s ease-out';
    
    const rect = element.getBoundingClientRect();
    ripple.style.left = (event.clientX - rect.left) + 'px';
    ripple.style.top = (event.clientY - rect.top) + 'px';
    
    element.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
  
  // Add ripple animation to CSS
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        width: 200px;
        height: 200px;
        opacity: 0;
      }
    }
    
    .mission-card-enhanced.active {
      border-color: #d4af37 !important;
      box-shadow: 0 25px 50px rgba(212, 175, 55, 0.4) !important;
    }
    
    .mission-card-enhanced.active .card-glow {
      opacity: 1 !important;
      animation: glow-rotate 3s linear infinite !important;
    }
  `;
  document.head.appendChild(style);
  
  // Auto-rotate through mission cards
  let currentMissionIndex = 0;
  const missionTypes = ['mission', 'vision', 'goals', 'values'];
  
  function autoRotateMission() {
    currentMissionIndex = (currentMissionIndex + 1) % missionTypes.length;
    const missionType = missionTypes[currentMissionIndex];
    
    updateMissionDisplay(missionType);
    updateProgressIndicator(missionType);
    
    // Update active card
    missionCards.forEach(c => c.classList.remove('active'));
    const targetCard = document.querySelector(`[data-mission="${missionType}"]`);
    if (targetCard) {
      targetCard.classList.add('active');
    }
  }
  
  // Start auto-rotation (optional - comment out if not desired)
  // setInterval(autoRotateMission, 5000);
  
  // Add parallax effect to floating icons
  const floatingIcons = document.querySelectorAll('.floating-icon');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const missionSection = document.querySelector('.mission-enhanced-container');
    
    if (missionSection) {
      const rect = missionSection.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isInView) {
        floatingIcons.forEach((icon, index) => {
          const speed = 0.5 + (index * 0.1);
          const yPos = -(scrolled * speed);
          icon.style.transform = `translateY(${yPos}px)`;
        });
      }
    }
  });
  
  // Add intersection observer for reveal animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        
        // Stagger animation for cards
        if (entry.target.classList.contains('mission-card-enhanced')) {
          setTimeout(() => {
            entry.target.style.transform = 'translateY(0)';
            entry.target.style.opacity = '1';
          }, Array.from(missionCards).indexOf(entry.target) * 100);
        }
      }
    });
  }, observerOptions);
  
  // Observe elements
  missionCards.forEach(card => {
    card.style.transform = 'translateY(30px)';
    card.style.opacity = '0';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
  });
  
  // Initialize with mission card active
  updateMissionDisplay('mission');
  updateProgressIndicator('mission');
  const firstCard = document.querySelector('[data-mission="mission"]');
  if (firstCard) {
    firstCard.classList.add('active');
  }
});
