/* ========================================
   DICTOLE - Reliable Chat Panel
   ======================================== */

// Global chat variables
let chatActive = false;
let conversationHistory = [];

// Chat responses database
const responses = {
  greetings: [
    "Hello! I'm here to support you. How are you feeling today?",
    "Hi there! Welcome to DICTOLE support. What's on your mind?",
    "Hey! I'm glad you reached out. How can I help you today?",
    "Hello! I'm here to listen and provide support. What's going on?"
  ],
  stress: [
    "I understand stress can be really overwhelming. Have you tried taking a few deep breaths? Sometimes that helps me too.",
    "Stress is tough, isn't it? Maybe try stepping away for a moment and doing something you enjoy.",
    "That sounds stressful. Remember, it's okay to take breaks and prioritize your well-being."
  ],
  anxiety: [
    "Anxiety can feel so intense. Grounding techniques like naming 5 things you can see might help in the moment.",
    "I hear you. Anxiety is common, and it's brave of you to talk about it. Have you found any coping strategies that work for you?",
    "That must be really uncomfortable. You're not alone in this – many people experience anxiety."
  ],
  depression: [
    "Feeling down can be so heavy. It's important to be gentle with yourself during these times.",
    "Depression can make everything feel harder. Have you been able to connect with anyone supportive?",
    "I'm sorry you're going through this. Remember that your feelings are valid, and seeking help is a positive step."
  ],
  help: [
    "I'm here to listen and support you. You can talk about stress, anxiety, depression, sleep, exercise, motivation, self-care, or just share what's on your mind.",
    "I can help with various mental health topics. What would you like to discuss today?",
    "I'm trained to provide support for mental health concerns. What's been on your mind lately?"
  ],
  default: [
    "I appreciate you sharing that with me. How does that make you feel?",
    "That sounds important. Can you tell me more about what's been going on?",
    "I'm here to listen. What's been on your mind lately?",
    "Thanks for opening up. How are you coping with everything?",
    "I hear you. What support do you think might help right now?"
  ]
};

// Quiz questions
const quizQuestions = [
  "Do you often feel anxious or overwhelmed?",
  "Have you been sleeping well lately?",
  "Do you feel stressed at work or school?",
  "Have you been feeling sad or down recently?",
  "Do you find it hard to focus or concentrate?"
];

let currentQuizIndex = 0;
let quizActive = false;

// Initialize chat when page loads
document.addEventListener('DOMContentLoaded', function() {
  console.log('Chat system initializing...');
  initializeChatSystem();
  
  // Set up event listeners
  setupEventListeners();
  
  // Start ambient animations
  startAmbientAnimations();
});

function initializeChatSystem() {
  const sendBtn = document.getElementById("sendBtn");
  const chatMessage = document.getElementById("chatMessage");
  
  if (sendBtn && chatMessage) {
    sendBtn.addEventListener("click", sendMessage);
    chatMessage.addEventListener("keypress", function(e) {
      if (e.key === "Enter") {
        sendMessage();
      }
    });
  }
  
  console.log('Chat system initialized successfully');
}

function setupEventListeners() {
  // Panel open detection
  const chatPanel = document.getElementById('panel-chat');
  if (chatPanel) {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.target.classList.contains('active')) {
          console.log('Chat panel opened');
          chatActive = true;
          resetChatSession();
        } else {
          chatActive = false;
        }
      });
    });
    observer.observe(chatPanel, { attributes: true, attributeFilter: ['class'] });
  }
}

function resetChatSession() {
  // Clear existing messages except welcome
  const chatBox = document.getElementById("chatBox");
  if (chatBox) {
    const messages = chatBox.querySelectorAll('.message');
    messages.forEach(msg => msg.remove());
  }
  
  // Reset conversation state
  conversationHistory = [];
  quizActive = false;
  currentQuizIndex = 0;
  
  console.log('Chat session reset');
}

function sendMessage() {
  const chatMessage = document.getElementById("chatMessage");
  const chatBox = document.getElementById("chatBox");
  
  if (!chatMessage || !chatBox) {
    console.error('Chat elements not found');
    return;
  }
  
  const message = chatMessage.value.trim();
  if (!message) return;
  
  // Add user message
  addMessage(message, "sent");
  
  // Clear input
  chatMessage.value = "";
  
  // Show typing indicator
  showTypingIndicator();
  
  // Process and respond
  setTimeout(() => {
    removeTypingIndicator();
    processMessage(message);
  }, 1000 + Math.random() * 1000);
}

function addMessage(text, type) {
  const chatBox = document.getElementById("chatBox");
  if (!chatBox) return;
  
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${type}`;
  messageDiv.textContent = text;
  
  // Add animation
  messageDiv.style.opacity = "0";
  messageDiv.style.transform = "translateY(10px)";
  
  chatBox.appendChild(messageDiv);
  
  // Animate in
  setTimeout(() => {
    messageDiv.style.opacity = "1";
    messageDiv.style.transform = "translateY(0)";
    messageDiv.style.transition = "all 0.3s ease";
  }, 10);
  
  // Scroll to bottom
  chatBox.scrollTop = chatBox.scrollHeight;
}

function showTypingIndicator() {
  const chatBox = document.getElementById("chatBox");
  if (!chatBox) return;
  
  const typingDiv = document.createElement("div");
  typingDiv.className = "message received typing";
  typingDiv.innerHTML = "🤖 Typing...";
  typingDiv.id = "typing-indicator";
  
  chatBox.appendChild(typingDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTypingIndicator() {
  const typingIndicator = document.getElementById("typing-indicator");
  if (typingIndicator) {
    typingIndicator.remove();
  }
}

function processMessage(message) {
  const lowerMessage = message.toLowerCase();
  
  // Handle quiz
  if (lowerMessage.includes("quiz") && !quizActive) {
    startQuiz();
    return;
  }
  
  if (quizActive) {
    handleQuizResponse(lowerMessage);
    return;
  }
  
  // Handle help request
  if (lowerMessage.includes("help")) {
    const response = responses.help[Math.floor(Math.random() * responses.help.length)];
    addMessage(response);
    return;
  }
  
  // First message - send greeting
  if (conversationHistory.length === 0) {
    const greeting = responses.greetings[Math.floor(Math.random() * responses.greetings.length)];
    addMessage(greeting);
    conversationHistory.push({ role: "user", content: message });
    conversationHistory.push({ role: "assistant", content: greeting });
    return;
  }
  
  // Handle specific topics
  let response = null;
  if (lowerMessage.includes("stress")) {
    response = responses.stress[Math.floor(Math.random() * responses.stress.length)];
  } else if (lowerMessage.includes("anx")) {
    response = responses.anxiety[Math.floor(Math.random() * responses.anxiety.length)];
  } else if (lowerMessage.includes("sad") || lowerMessage.includes("depress")) {
    response = responses.depression[Math.floor(Math.random() * responses.depression.length)];
  }
  
  // Default response
  if (!response) {
    response = responses.default[Math.floor(Math.random() * responses.default.length)];
  }
  
  addMessage(response);
  conversationHistory.push({ role: "user", content: message });
  conversationHistory.push({ role: "assistant", content: response });
}

function startQuiz() {
  quizActive = true;
  currentQuizIndex = 0;
  addMessage("📝 I'd be happy to guide you through a quick mental health check-in!");
  addMessage(`Question 1: ${quizQuestions[currentQuizIndex]}`);
}

function handleQuizResponse(response) {
  if (response !== "yes" && response !== "no") {
    addMessage("⚠️ For this quiz, please answer with 'yes' or 'no' so I can understand better.");
    return;
  }
  
  currentQuizIndex++;
  
  if (currentQuizIndex < quizQuestions.length) {
    addMessage(`Question ${currentQuizIndex + 1}: ${quizQuestions[currentQuizIndex]}`);
  } else {
    quizActive = false;
    addMessage("✅ Thanks for completing the check-in! Remember that professional support is always available if you need it. You're taking great care of yourself by checking in. 💛");
  }
}

// Quick action functions
function startQuickHelp() {
  const helpResponse = responses.help[Math.floor(Math.random() * responses.help.length)];
  addMessage(helpResponse);
}

function startQuiz() {
  sendMessage();
  setTimeout(() => {
    const chatMessage = document.getElementById("chatMessage");
    if (chatMessage) {
      chatMessage.value = "quiz";
      sendMessage();
    }
  }, 100);
}

function showTips() {
  const tips = [
    "🌿 Here are some wellness tips that might help:",
    "• Take 5 deep breaths when feeling overwhelmed",
    "• Write down 3 things you're grateful for today", 
    "• Go for a short walk outside",
    "• Listen to calming music",
    "• Connect with a friend or loved one",
    "",
    "Remember to be patient with yourself. Small steps add up! 💚"
  ];
  
  tips.forEach(tip => {
    addMessage(tip);
  });
}

function showCrisisSupport() {
  const crisisMessage = "🚨 I understand you need immediate support. Here are crisis resources:\n\n📞 Emergency: Call 911 or local emergency number\n📞 Crisis Hotline: +2547 90076248\n💬 WhatsApp: https://wa.me/254790076248\n\nYou're not alone, and help is available 24/7. Please reach out - you deserve support. 💙";
  
  addMessage(crisisMessage);
  
  // Open WhatsApp
  setTimeout(() => {
    window.open('https://wa.me/254790076248', '_blank');
  }, 2000);
}

function startAmbientAnimations() {
  const particles = document.querySelectorAll('.chat-particle');
  
  particles.forEach((particle, index) => {
    // Random initial position
    particle.style.transform = `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)`;
    
    // Animate particles
    setInterval(() => {
      const randomX = Math.random() * 20 - 10;
      const randomY = Math.random() * 20 - 10;
      const randomRotate = Math.random() * 360;
      
      particle.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
      particle.style.opacity = 0.3 + Math.random() * 0.4;
    }, 3000 + index * 500);
  });
}

// Global functions for onclick handlers
window.startQuickHelp = startQuickHelp;
window.startQuiz = startQuiz;
window.showTips = showTips;
window.showCrisisSupport = showCrisisSupport;

// Test function to verify chat panel is working
window.testChatPanel = function() {
  console.log('Testing chat panel...');
  const chatPanel = document.getElementById('panel-chat');
  if (chatPanel) {
    console.log('Chat panel found:', chatPanel);
    chatPanel.style.display = 'block';
    chatPanel.classList.add('active');
    console.log('Chat panel should now be visible');
  } else {
    console.error('Chat panel not found!');
  }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeChatSystem);
} else {
  initializeChatSystem();
}

console.log('DICTOLE Chat Panel loaded successfully!');
