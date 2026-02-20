/* ========================================
   DICTOLE - Share Functionality
   ======================================== */

// Share content templates
const shareTemplates = {
  whatsapp: {
    awareness: `🧠 Mental Health Awareness

Your mental health matters just as much as your physical health. DICTOLE Mental Health Foundation is here to provide support, resources, and a compassionate community.

📞 Call us: +2547 90076248
🌐 Visit: dictolementalhealthfoundation.netlify.app

#MentalHealth #DICTOLE #Wellness #Support`,
    
    services: `🤝 Professional Mental Health Services

DICTOLE offers:
• Individual Therapy
• Group Support Sessions
• Mental Health Workshops
• Community Outreach Programs

Take the first step towards better mental health today.

📞 +2547 90076248
🌐 dictolementalhealthfoundation.netlify.app

#MentalHealthServices #Therapy #Support`,
    
    support: `💬 Need Someone to Talk To?

You're not alone. DICTOLE Mental Health Foundation provides:
✅ Confidential counseling
✅ Support groups
✅ Mental health resources
✅ Community connection

Reach out today - we're here to help.

📞 +2547 90076248
📧 dictolementalhealthfoundation@gmail.com
🌐 dictolementalhealthfoundation.netlify.app

#MentalHealthSupport #YouAreNotAlone`
  },
  
  instagram: {
    mission: `🌟 Our Mission at DICTOLE

Empowering individuals and communities by raising mental health awareness, providing accessible mental health services, and developing compassionate support networks.

Everyone deserves access to quality mental health care. Join us in breaking the stigma and creating a world where mental well-being is prioritized.

📞 +2547 90076248
🌐 dictolementalhealthfoundation.netlify.app

#DICTOLE #MentalHealthMission #BreakTheStigma #MentalWellness #CommunitySupport`,
    
    community: `🤝 Building Stronger Communities Together

At DICTOLE, we believe in the power of community support. Our foundation brings people together to:

• Share experiences without judgment
• Learn coping strategies
• Access professional resources
• Build lasting connections

Together, we create a safe space for healing and growth.

Join our community today! Link in bio.

#CommunitySupport #MentalHealthCommunity #DICTOLE #TogetherWeRise #MentalHealthAwareness`,
    
    wellness: `🌿 Daily Wellness Tips from DICTOLE

Small steps can make a big difference in your mental health journey:

✨ Start your day with gratitude
🧘‍♀️ Take 5 minutes for deep breathing
📝 Write down your thoughts
🌞 Get some sunlight
💧 Stay hydrated
👂 Listen to calming music

Remember: Self-care isn't selfish - it's essential!

What's your favorite wellness tip? Share in the comments! 👇

📞 +2547 90076248 for professional support
🌐 dictolementalhealthfoundation.netlify.app

#WellnessTips #SelfCare #MentalHealth #DICTOLE #DailyWellness`
  }
};

// Initialize share functionality
document.addEventListener('DOMContentLoaded', function() {
  const shareBtn = document.getElementById('shareBtn');
  const navShareBtn = document.getElementById('navShareBtn');
  const copyLinkBtn = document.getElementById('copyLinkBtn');
  const previewContent = document.getElementById('previewContent');
  
  // Share button click handlers
  if (shareBtn) {
    shareBtn.addEventListener('click', () => openSharePanel());
  }
  
  if (navShareBtn) {
    navShareBtn.addEventListener('click', () => openSharePanel());
  }
  
  // Template button handlers
  const templateBtns = document.querySelectorAll('.template-btn');
  templateBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const platform = this.dataset.platform;
      const template = this.dataset.template;
      
      // Update active state
      templateBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      // Show preview
      if (shareTemplates[platform] && shareTemplates[platform][template]) {
        previewContent.textContent = shareTemplates[platform][template];
      }
    });
  });
  
  // General share button handlers
  const generalShareBtns = document.querySelectorAll('.share-general-btn');
  generalShareBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const platform = this.dataset.platform;
      shareToGeneralPlatform(platform);
    });
  });
  
  // Copy link button handler
  if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', copyWebsiteLink);
  }
  
  // Template double-click to share
  templateBtns.forEach(btn => {
    btn.addEventListener('dblclick', function() {
      const platform = this.dataset.platform;
      const template = this.dataset.template;
      
      if (platform === 'whatsapp') {
        shareToWhatsApp(template);
      } else if (platform === 'instagram') {
        shareToInstagram(template);
      }
    });
  });
});

// Open share panel
function openSharePanel() {
  const panel = document.getElementById('panel-share');
  if (panel && typeof openPanel === 'function') {
    openPanel('share');
  } else if (panel) {
    // Fallback if panel system not loaded
    panel.style.display = 'block';
    setTimeout(() => panel.classList.add('active'), 10);
    document.body.style.overflow = 'hidden';
  }
}

// Share to WhatsApp
function shareToWhatsApp(templateType) {
  const content = shareTemplates.whatsapp[templateType];
  if (!content) return;
  
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(content)}`;
  window.open(whatsappUrl, '_blank');
}

// Share to Instagram (caption copy)
function shareToInstagram(templateType) {
  const content = shareTemplates.instagram[templateType];
  if (!content) return;
  
  // Copy caption to clipboard
  navigator.clipboard.writeText(content).then(() => {
    alert('Instagram caption copied to clipboard! 📸\n\nNow open Instagram and paste it in your story or post.\n\nDon\'t forget to add a great image! 🌟');
    
    // Open Instagram after a short delay
    setTimeout(() => {
      window.open('https://www.instagram.com/', '_blank');
    }, 1000);
  }).catch(() => {
    // Fallback if clipboard API fails
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
      background: #1a1a1a; color: white; padding: 20px; border-radius: 12px;
      z-index: 10000; max-width: 400px; text-align: center;
      border: 2px solid #d4af37;
    `;
    modal.innerHTML = `
      <h3 style="color: #d4af37; margin: 0 0 10px 0;">Instagram Caption</h3>
      <textarea style="width: 100%; height: 150px; background: #333; color: white; border: 1px solid #666; border-radius: 8px; padding: 10px; margin: 10px 0;" readonly>${content}</textarea>
      <button onclick="this.parentElement.remove()" style="background: #d4af37; color: #0d1117; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-weight: bold;">Close</button>
    `;
    document.body.appendChild(modal);
  });
}

// Share to general platforms
function shareToGeneralPlatform(platform) {
  const url = window.location.href;
  const title = 'DICTOLE Mental Health Foundation';
  const text = 'Supporting mental health and wellness in our community';
  
  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}&hashtags=MentalHealth,DICTOLE`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
  };
  
  if (shareUrls[platform]) {
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  }
}

// Copy website link
function copyWebsiteLink() {
  const url = window.location.href;
  
  navigator.clipboard.writeText(url).then(() => {
    const btn = document.getElementById('copyLinkBtn');
    const originalText = btn.textContent;
    btn.textContent = '✅ Copied!';
    btn.style.background = 'rgba(34, 197, 94, 0.2)';
    btn.style.borderColor = 'rgba(34, 197, 94, 0.5)';
    
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.style.borderColor = '';
    }, 2000);
  }).catch(() => {
    // Fallback
    prompt('Copy this link:', url);
  });
}

// Add share panel to panel configurations
if (typeof panelConfigs !== 'undefined') {
  panelConfigs.share = { duration: 500 };
}
