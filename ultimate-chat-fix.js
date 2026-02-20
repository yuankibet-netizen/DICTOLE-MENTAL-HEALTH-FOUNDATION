/* ========================================
   DICTOLE - ULTIMATE CHAT PANEL FIX
   ======================================== */

// Ultimate chat panel fix - guaranteed to work
document.addEventListener('DOMContentLoaded', function() {
  console.log('ULTIMATE CHAT FIX: Initializing...');
  
  // Wait a bit for everything to load
  setTimeout(() => {
    fixChatPanel();
  }, 100);
});

function fixChatPanel() {
  console.log('ULTIMATE CHAT FIX: Starting fix...');
  
  // 1. Find all chat-related elements
  const chatPanel = document.getElementById('panel-chat');
  const chatButtons = document.querySelectorAll('[data-panel="chat"]');
  const overlay = document.querySelector('.panel-overlay');
  
  console.log('ULTIMATE CHAT FIX: Elements found:', {
    chatPanel: !!chatPanel,
    chatButtons: chatButtons.length,
    overlay: !!overlay
  });
  
  if (!chatPanel) {
    console.error('ULTIMATE CHAT FIX: Chat panel not found!');
    return;
  }
  
  // 2. Remove all existing event listeners
  chatButtons.forEach(btn => {
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
  });
  
  // 3. Add our own reliable click handlers
  const newChatButtons = document.querySelectorAll('[data-panel="chat"]');
  newChatButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('ULTIMATE CHAT FIX: Chat button clicked!');
      openChatPanelUltimate();
    });
  });
  
  // 4. Set up close handlers
  const closeButtons = chatPanel.querySelectorAll('.panel-close, .panel-close-text');
  closeButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      console.log('ULTIMATE CHAT FIX: Close button clicked!');
      closeChatPanelUltimate();
    });
  });
  
  // 5. Set up overlay click to close
  if (overlay) {
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        console.log('ULTIMATE CHAT FIX: Overlay clicked!');
        closeChatPanelUltimate();
      }
    });
  }
  
  // 6. Set up escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && chatPanel.classList.contains('active')) {
      console.log('ULTIMATE CHAT FIX: Escape key pressed!');
      closeChatPanelUltimate();
    }
  });
  
  console.log('ULTIMATE CHAT FIX: Setup complete!');
}

function openChatPanelUltimate() {
  console.log('ULTIMATE CHAT FIX: Opening chat panel...');
  
  const chatPanel = document.getElementById('panel-chat');
  const overlay = document.querySelector('.panel-overlay');
  
  if (!chatPanel) {
    console.error('ULTIMATE CHAT FIX: Chat panel not found!');
    return;
  }
  
  // Close any other panels first
  const allPanels = document.querySelectorAll('.overlay-panel');
  allPanels.forEach(panel => {
    if (panel.id !== 'panel-chat') {
      panel.classList.remove('active');
      panel.style.display = 'none';
    }
  });
  
  // Show overlay
  if (overlay) {
    overlay.style.display = 'block';
    overlay.classList.add('active');
  }
  
  // Apply ultimate show styles
  chatPanel.style.cssText = `
    display: block !important;
    position: fixed !important;
    top: 0 !important;
    left: 50% !important;
    bottom: 0 !important;
    width: 90% !important;
    max-width: 600px !important;
    opacity: 1 !important;
    visibility: visible !important;
    transform: translateX(-50%) translateY(0) !important;
    z-index: 2001 !important;
    background: linear-gradient(135deg, #1a1f2e 0%, #2d3748 50%, #1a202c 100%) !important;
    border: 2px solid rgba(212, 175, 55, 0.3) !important;
    border-radius: 0 !important;
    box-shadow: 0 25px 80px rgba(0, 0, 0, 0.4) !important;
  `;
  
  chatPanel.classList.add('active');
  
  // Prevent body scroll
  document.body.style.overflow = 'hidden';
  document.body.classList.add('panel-open');
  
  // Initialize chat if needed
  initializeChatIfReady();
  
  console.log('ULTIMATE CHAT FIX: Chat panel opened successfully!');
  console.log('ULTIMATE CHAT FIX: Panel styles:', chatPanel.style.cssText);
}

function closeChatPanelUltimate() {
  console.log('ULTIMATE CHAT FIX: Closing chat panel...');
  
  const chatPanel = document.getElementById('panel-chat');
  const overlay = document.querySelector('.panel-overlay');
  
  if (!chatPanel) {
    console.error('ULTIMATE CHAT FIX: Chat panel not found!');
    return;
  }
  
  // Hide panel
  chatPanel.classList.remove('active');
  chatPanel.style.display = 'none';
  
  // Hide overlay
  if (overlay) {
    overlay.classList.remove('active');
    overlay.style.display = 'none';
  }
  
  // Restore body scroll
  document.body.style.overflow = '';
  document.body.classList.remove('panel-open');
  
  console.log('ULTIMATE CHAT FIX: Chat panel closed successfully!');
}

function initializeChatIfReady() {
  console.log('ULTIMATE CHAT FIX: Initializing chat functionality...');
  
  // Check if chat functions are available
  if (typeof startQuickHelp === 'function' && 
      typeof startQuiz === 'function' && 
      typeof showTips === 'function' && 
      typeof showCrisisSupport === 'function') {
    console.log('ULTIMATE CHAT FIX: Chat functions already available');
    return;
  }
  
  // Add basic chat functionality if not available
  const sendBtn = document.getElementById("sendBtn");
  const chatMessage = document.getElementById("chatMessage");
  const chatBox = document.getElementById("chatBox");
  
  if (sendBtn && chatMessage && chatBox) {
    console.log('ULTIMATE CHAT FIX: Adding basic chat functionality...');
    
    sendBtn.addEventListener("click", function() {
      const message = chatMessage.value.trim();
      if (message) {
        addChatMessage(message, "sent");
        chatMessage.value = "";
        
        // Simulate bot response
        setTimeout(() => {
          addChatMessage("I'm here to help! You can talk to me about stress, anxiety, depression, relationships, or any mental health concerns.", "received");
        }, 1000);
      }
    });
    
    chatMessage.addEventListener("keypress", function(e) {
      if (e.key === "Enter") {
        sendBtn.click();
      }
    });
  }
}

function addChatMessage(text, type) {
  const chatBox = document.getElementById("chatBox");
  if (!chatBox) return;
  
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${type}`;
  messageDiv.textContent = text;
  
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Global test functions
window.ultimateTestChat = function() {
  console.log('ULTIMATE CHAT FIX: Running ultimate test...');
  openChatPanelUltimate();
};

window.ultimateCloseChat = function() {
  console.log('ULTIMATE CHAT FIX: Running ultimate close...');
  closeChatPanelUltimate();
};

window.debugChatElements = function() {
  console.log('ULTIMATE CHAT FIX: Debugging elements...');
  console.log('Chat panel:', document.getElementById('panel-chat'));
  console.log('Chat buttons:', document.querySelectorAll('[data-panel="chat"]'));
  console.log('Overlay:', document.querySelector('.panel-overlay'));
  console.log('Send button:', document.getElementById('sendBtn'));
  console.log('Chat input:', document.getElementById('chatMessage'));
  console.log('Chat box:', document.getElementById('chatBox'));
};

// Professional chat functions
window.startQuickHelp = function() {
  const chatBox = document.getElementById("chatBox");
  if (chatBox) {
    addChatMessage("I'm here to help you with any mental health concerns. You can talk to me about stress, anxiety, depression, relationships, work, sleep, or any other mental health topics.", "received");
  }
};

window.startQuiz = function() {
  const chatBox = document.getElementById("chatBox");
  if (chatBox) {
    addChatMessage("Let's do a quick mental health check-in. First question: Do you often feel anxious or overwhelmed?", "received");
  }
};

window.showTips = function() {
  const chatBox = document.getElementById("chatBox");
  if (chatBox) {
    addChatMessage("Here are some wellness tips that might help:", "received");
    addChatMessage("• Take 5 deep breaths when feeling overwhelmed", "received");
    addChatMessage("• Write down 3 things you're grateful for today", "received");
    addChatMessage("• Go for a short walk outside", "received");
    addChatMessage("• Listen to calming music", "received");
    addChatMessage("• Connect with a friend or loved one", "received");
  }
};

window.showCrisisSupport = function() {
  const chatBox = document.getElementById("chatBox");
  if (chatBox) {
    addChatMessage("🚨 I understand you need immediate support. Here are crisis resources:", "received");
    addChatMessage("📞 Emergency: Call 911 or local emergency number", "received");
    addChatMessage("📞 Crisis Hotline: +2547 90076248", "received");
    addChatMessage("💬 WhatsApp: https://wa.me/254790076248", "received");
    addChatMessage("You're not alone, and help is available 24/7. Please reach out - you deserve support.", "received");
  }
  
  // Open WhatsApp
  setTimeout(() => {
    window.open('https://wa.me/254790076248', '_blank');
  }, 2000);
};

window.sendSuggestion = function(topic) {
  const chatMessage = document.getElementById("chatMessage");
  if (chatMessage) {
    chatMessage.value = topic;
    const sendBtn = document.getElementById("sendBtn");
    if (sendBtn) {
      sendBtn.click();
    }
  }
};

console.log('ULTIMATE CHAT FIX: Script loaded!');
