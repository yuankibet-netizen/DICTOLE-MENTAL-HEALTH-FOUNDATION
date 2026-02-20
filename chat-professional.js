/* ========================================
   DICTOLE - Professional Enhanced Chat Panel
   ======================================== */

// Global chat variables
let chatActive = false;
let conversationHistory = [];

// Enhanced professional chat responses database
const responses = {
  greetings: [
    "Hello! I'm here to support you on your mental health journey. How are you feeling today?",
    "Hi there! Welcome to DICTOLE support. What's on your mind today?",
    "Hey! I'm glad you reached out. How can I help you today?",
    "Hello! I'm here to listen and provide support. What's going on with you?",
    "Welcome! I'm your mental health support assistant. What brings you here today?",
    "Hi! I'm here to help you with any mental health concerns. How can I assist you?",
    "Hello! I'm trained to provide support for mental wellness. What would you like to talk about?",
    "Hey there! I'm here to listen and support you. What's on your mind?",
    "Welcome! I'm here to help with your mental health journey. How are you doing today?",
    "Hi! I'm glad you're here. Let's talk about what's on your mind."
  ],
  stress: [
    "I understand stress can be really overwhelming. Have you tried taking a few deep breaths? Sometimes that helps me too.",
    "Stress is tough, isn't it? Maybe try stepping away for a moment and doing something you enjoy.",
    "That sounds stressful. Remember, it's okay to take breaks and prioritize your well-being.",
    "I hear you're feeling stressed. What's been causing you stress lately? I'm here to listen.",
    "Stress can feel so heavy. Have you noticed any patterns in what triggers your stress?",
    "That sounds really stressful. You're not alone in feeling this way. What helps you cope?",
    "I understand stress can be overwhelming. Let's talk about some strategies that might help you.",
    "Stress affects everyone differently. What does stress feel like for you?",
    "That sounds like a lot to handle. Have you been able to find any healthy ways to manage stress?"
  ],
  anxiety: [
    "Anxiety can feel so intense. Grounding techniques like naming 5 things you can see might help in the moment.",
    "I hear you. Anxiety is common, and it's brave of you to talk about it. Have you found any coping strategies that work for you?",
    "That must be really uncomfortable. You're not alone in this – many people experience anxiety.",
    "Anxiety can be so overwhelming. What does your anxiety feel like when it shows up?",
    "I understand anxiety can be challenging. Have you tried any relaxation techniques that help?",
    "That sounds like you're dealing with anxiety. You're taking a brave step by talking about it.",
    "Anxiety can make everything feel harder. What helps you when you're feeling anxious?",
    "I hear you're experiencing anxiety. Remember that anxiety is treatable and you're not alone.",
    "That sounds really tough. Anxiety can be overwhelming, but you have the strength to work through it."
  ],
  depression: [
    "Feeling down can be so heavy. It's important to be gentle with yourself during these times.",
    "Depression can make everything feel harder. Have you been able to connect with anyone supportive?",
    "I'm sorry you're going through this. Remember that your feelings are valid, and seeking help is a positive step.",
    "That sounds really difficult. Depression can make everything feel overwhelming. You're not alone in this.",
    "I hear you're feeling down. Depression is serious, and it's brave of you to reach out for support.",
    "That sounds really challenging. Depression can make everything feel harder, but you have strength you might not see right now.",
    "I understand depression can feel isolating. You're not alone, and there is hope for feeling better.",
    "That sounds really challenging. Depression can make everything feel harder, but you have strength you might not see right now.",
    "I hear you're feeling depressed. Your feelings are valid, and it's okay to ask for help."
  ],
  sleep: [
    "Sleep issues can really affect everything else. Have you tried creating a calming bedtime routine?",
    "Poor sleep is frustrating, isn't it? Maybe try dimming the lights earlier in the evening.",
    "Sleep is so important for mental health. What do you think might be disrupting your sleep?",
    "I hear you're having trouble sleeping. Lack of sleep can make everything feel harder.",
    "Sleep problems can be really challenging. Have you noticed any patterns in your sleep difficulties?",
    "That sounds frustrating. Sleep is essential for mental wellness. What's been keeping you awake?",
    "I understand sleep issues can be really disruptive. Have you tried any relaxation techniques before bed?",
    "Poor sleep can make everything feel more difficult. What helps you wind down at night?",
    "That sounds exhausting. Sleep problems can really affect your mood and energy levels."
  ],
  therapy: [
    "Therapy can be incredibly helpful for mental health. Have you considered talking to a professional?",
    "I think therapy could be really beneficial for you. Would you like information about finding a therapist?",
    "Therapy provides a safe space to explore your thoughts and feelings. Have you been to therapy before?",
    "Talking to a therapist can make a big difference. What would you like to know about therapy?",
    "I highly recommend considering therapy. It's a brave step toward better mental health.",
    "Therapy can help you develop coping strategies and gain insights. Are you interested in learning more?",
    "A good therapist can provide tools and support for your mental health journey. Would you like help finding one?",
    "Therapy is a powerful tool for mental wellness. What questions do you have about the therapy process?",
    "Talking to a professional can really help. Have you thought about what kind of therapy might work for you?"
  ],
  medication: [
    "Medication can be an important part of mental health treatment for some people. Are you currently taking any medications?",
    "Medication management should always be done with medical supervision. Have you talked to a doctor about your medications?",
    "I understand medication can be part of treatment. It's important to work closely with healthcare providers.",
    "Medication decisions should always be made with healthcare providers. Have you been consulting with yours?",
    "I'm not a medical professional, but I encourage you to discuss any medication questions with your doctor.",
    "Medication management is important. Are you in touch with your healthcare provider about your treatment?",
    "I can't provide medical advice, but I encourage you to speak with a healthcare professional about medications.",
    "Medication management is important. Are you following your doctor's instructions and ask questions?",
    "I understand medication can be part of treatment. Always follow your doctor's instructions and ask questions."
  ],
  relationship: [
    "Relationships can be challenging sometimes. What's going on in your relationships that's on your mind?",
    "Relationships can be a source of both joy and stress. How are your relationships affecting your mental health?",
    "I understand relationship issues can be really difficult. Would you like to talk about what's happening?",
    "Relationships are important for our wellbeing. What's concerning you about your relationships right now?",
    "I'm here to listen about relationship concerns. What would help you feel more supported?",
    "Relationships can be complex and emotionally charged. What's been happening that's affecting you?",
    "I understand relationship issues can be really difficult. You deserve to have healthy, supportive connections.",
    "Relationships can be both wonderful and challenging. What would help you navigate yours better?",
    "I'm here to listen about relationship concerns. What's been happening that's affecting your mental health?"
  ],
  work: [
    "Work can be a major source of stress. What's been happening at work that's affecting you?",
    "Work-related stress is very common. How are you coping with the pressures at your job?",
    "I understand work can be really demanding sometimes. What's been challenging you at work?",
    "Work-life balance is so important for mental health. How are you managing your work stress?",
    "I hear you're dealing with work issues. What's been making work difficult for you lately?",
    "Work can be really stressful. Have you found any ways to manage work-related anxiety?",
    "I understand work pressure can be overwhelming. What's been the most challenging aspect of work for you?",
    "Work-related stress can really impact mental health. Have you considered setting boundaries at work?",
    "I hear you're dealing with work concerns. What would make your work situation better for you?"
  ],
  family: [
    "Family dynamics can be complex and emotionally charged. What's been happening with your family?",
    "Family relationships can be both supportive and challenging. How are you feeling about your family situation?",
    "I understand family issues can be really difficult. What's been on your mind regarding your family?",
    "Family can be both a source of comfort and stress. How are your family relationships affecting you?",
    "I'm here to listen about family concerns. What would help you feel more supported by your family?",
    "Family dynamics can be really challenging sometimes. What's been happening that's concerning you?",
    "I understand family issues can be emotionally draining. You deserve to have healthy family connections.",
    "Family relationships are important for our wellbeing. What would help you improve yours?",
    "I'm here to listen about family concerns. What's been happening that's affecting your mental health?"
  ],
  friends: [
    "Friendships are so important for mental health. How are your friends supporting you right now?",
    "Good friends can make such a difference. Have you been able to connect with your friends lately?",
    "Friendships can be both comforting and challenging. What's been happening with your friends?",
    "I understand social connections are important. How are your friendships affecting your wellbeing?",
    "Friends can be a great source of support. Have you been able to talk to any friends about what you're going through?",
    "Social connections are vital for mental health. What would help you strengthen your friendships?",
    "I hear you're thinking about friends. Good friends can be such a support system.",
    "Friendships can be really important during difficult times. How are your friends supporting you?",
    "Social support from friends can make a big difference. Have you been able to lean on your friends?"
  ],
  suicide: [
    "I'm really glad you reached out about this. Your life is valuable and there is help available. Please call emergency services right away if you're in immediate danger.",
    "This sounds really serious. Please reach out to emergency services or a crisis hotline immediately. Your life matters and there are people who want to help.",
    "I'm concerned about what you're sharing. Please contact emergency services or a crisis hotline immediately. You can call 911 or text HOME to 741741 in the US.",
    "This sounds urgent. Please reach out to emergency services or a crisis hotline immediately. You deserve support and help.",
    "I'm really worried about you. Please contact emergency services or a crisis hotline immediately. There are people who want to help you through this.",
    "This is really important. Please reach out to emergency services or a crisis hotline right away. Your life is precious and there is help available.",
    "I'm here to listen, but this sounds serious. Please contact emergency services or a crisis hotline immediately.",
    "I want you to know that help is available. Please reach out to emergency services or a crisis hotline right away.",
    "This sounds urgent. Please don't hesitate to contact emergency services. You deserve support and help."
  ],
  general: [
    "I appreciate you sharing that with me. How does that make you feel?",
    "That sounds important. Can you tell me more about what's been going on?",
    "I'm here to listen. What's been on your mind lately?",
    "Thanks for opening up. How are you coping with everything?",
    "I hear you. What support do you think might help right now?",
    "That's really insightful. What does that make you think about?",
    "I understand. How does this situation affect you?",
    "Thank you for sharing that with me. What would be most helpful for you right now?",
    "I'm here to support you. What would help you feel better?",
    "That makes sense. What have you tried so far that's helped or not helped?",
    "I'm listening carefully. What's the most challenging part of this for you?",
    "I understand. What would make this situation more manageable for you?",
    "That sounds really difficult. You're handling this with strength, even if it doesn't feel like it."
  ],
  help: [
    "I'm here to help in any way I can. I can provide information about mental health topics, listen supportively, or help you find resources.",
    "I'm trained to provide support for various mental health concerns. What would be most helpful for you right now?",
    "I'm here to support you with mental health information, coping strategies, or just to listen. What do you need?",
    "I can help with stress management, anxiety coping, depression support, sleep issues, relationship advice, or finding professional help. What would you like to explore?",
    "I'm trained to help with various mental health topics including stress, anxiety, depression, relationships, work-life balance, and finding professional support. How can I assist you?",
    "I'm here to provide mental health support and information. I can provide information about conditions, coping strategies, treatment options, or just be here to listen. What would be most helpful?",
    "I'm your mental health support assistant. I can provide information, guidance, or just be here to listen. What would you like to talk about?",
    "I'm here to help with mental health concerns. I can provide information about conditions, coping strategies, or just offer support. How can I help?"
  ],
  crisis: [
    "If you're in immediate crisis, please call emergency services (911) or a crisis hotline. Your safety is the priority.",
    "For immediate crisis support, please contact emergency services or a crisis hotline. There are people available 24/7 to help.",
    "If you're having thoughts of harming yourself, please reach out to emergency services immediately. Your life is valuable and help is available.",
    "For crisis situations, please contact emergency services or a crisis hotline right away. There are trained professionals ready to help you.",
    "If you're in crisis, please reach out to emergency services or a crisis hotline. You don't have to go through this alone.",
    "If you need immediate help, please call emergency services or a crisis hotline. There are people who want to help you through this.",
    "If you're in crisis, please don't hesitate to contact emergency services or a crisis hotline. You're not alone in this.",
    "For immediate help, please reach out to emergency services or a crisis hotline. Your safety and wellbeing are most important.",
    "If you're in crisis, please reach out to emergency services or a crisis hotline. You deserve support and assistance.",
    "If you need urgent help, please reach out to emergency services or a crisis hotline. You're not alone in this."
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
  console.log('Professional chat system initializing...');
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
  
  console.log('Professional chat system initialized successfully');
}

function setupEventListeners() {
  // Panel open detection
  const chatPanel = document.getElementById('panel-chat');
  if (chatPanel) {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.target.classList.contains('active')) {
          console.log('Professional chat panel opened');
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
  
  console.log('Professional chat session reset');
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
  
  // Enhanced natural language processing
  let response = null;
  
  // Check for suicide/self-harm keywords (highest priority)
  if (lowerMessage.includes("suicide") || lowerMessage.includes("kill myself") || 
      lowerMessage.includes("end my life") || lowerMessage.includes("harm myself") ||
      lowerMessage.includes("want to die") || lowerMessage.includes("suicidal")) {
    response = responses.suicide[Math.floor(Math.random() * responses.suicide.length)];
  }
  // Check for crisis keywords
  else if (lowerMessage.includes("crisis") || lowerMessage.includes("emergency") ||
           lowerMessage.includes("urgent") || lowerMessage.includes("immediate help")) {
    response = responses.crisis[Math.floor(Math.random() * responses.crisis.length)];
  }
  // Check for specific mental health topics
  else if (lowerMessage.includes("stress") || lowerMessage.includes("overwhelmed") ||
           lowerMessage.includes("pressure") || lowerMessage.includes("burnout")) {
    response = responses.stress[Math.floor(Math.random() * responses.stress.length)];
  }
  else if (lowerMessage.includes("anx") || lowerMessage.includes("panic") ||
           lowerMessage.includes("worry") || lowerMessage.includes("nervous")) {
    response = responses.anxiety[Math.floor(Math.random() * responses.anxiety.length)];
  }
  else if (lowerMessage.includes("sad") || lowerMessage.includes("depress") ||
           lowerMessage.includes("down") || lowerMessage.includes("hopeless") ||
           lowerMessage.includes("worthless")) {
    response = responses.depression[Math.floor(Math.random() * responses.depression.length)];
  }
  else if (lowerMessage.includes("sleep") || lowerMessage.includes("insomnia") ||
           lowerMessage.includes("tired") || lowerMessage.includes("restless")) {
    response = responses.sleep[Math.floor(Math.random() * responses.sleep.length)];
  }
  else if (lowerMessage.includes("therapy") || lowerMessage.includes("counseling") ||
           lowerMessage.includes("therapist") || lowerMessage.includes("psychologist")) {
    response = responses.therapy[Math.floor(Math.random() * responses.therapy.length)];
  }
  else if (lowerMessage.includes("medication") || lowerMessage.includes("medicine") ||
           lowerMessage.includes("drugs") || lowerMessage.includes("pills")) {
    response = responses.medication[Math.floor(Math.random() * responses.medication.length)];
  }
  else if (lowerMessage.includes("relationship") || lowerMessage.includes("partner") ||
           lowerMessage.includes("boyfriend") || lowerMessage.includes("girlfriend") ||
           lowerMessage.includes("husband") || lowerMessage.includes("wife")) {
    response = responses.relationship[Math.floor(Math.random() * responses.relationship.length)];
  }
  else if (lowerMessage.includes("work") || lowerMessage.includes("job") ||
           lowerMessage.includes("career") || lowerMessage.includes("boss") ||
           lowerMessage.includes("colleague")) {
    response = responses.work[Math.floor(Math.random() * responses.work.length)];
  }
  else if (lowerMessage.includes("family") || lowerMessage.includes("parent") ||
           lowerMessage.includes("mother") || lowerMessage.includes("father") ||
           lowerMessage.includes("sibling") || lowerMessage.includes("child")) {
    response = responses.family[Math.floor(Math.random() * responses.family.length)];
  }
  else if (lowerMessage.includes("friend") || lowerMessage.includes("social") ||
           lowerMessage.includes("lonely") || lowerMessage.includes("alone")) {
    response = responses.friends[Math.floor(Math.random() * responses.friends.length)];
  }
  
  // Default response
  if (!response) {
    response = responses.general[Math.floor(Math.random() * responses.general.length)];
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
window.sendSuggestion = sendSuggestion;

// Function to send suggestion buttons
function sendSuggestion(topic) {
  const chatMessage = document.getElementById("chatMessage");
  if (chatMessage) {
    chatMessage.value = topic;
    sendMessage();
  }
}

// Test function to verify chat panel is working
window.testChatPanel = function() {
  console.log('Testing professional chat panel...');
  const chatPanel = document.getElementById('panel-chat');
  if (chatPanel) {
    console.log('Professional chat panel found:', chatPanel);
    console.log('Current classes:', chatPanel.className);
    console.log('Current display:', chatPanel.style.display);
    console.log('Current visibility:', chatPanel.style.visibility);
    console.log('Current transform:', chatPanel.style.transform);
    
    // Force show the panel
    chatPanel.style.display = 'block';
    chatPanel.style.visibility = 'visible';
    chatPanel.style.transform = 'translateX(0)';
    chatPanel.style.opacity = '1';
    chatPanel.classList.add('active');
    
    console.log('Professional chat panel should now be visible');
    console.log('New classes:', chatPanel.className);
    console.log('New display:', chatPanel.style.display);
    console.log('New visibility:', chatPanel.style.visibility);
    console.log('New transform:', chatPanel.style.transform);
  } else {
    console.error('Professional chat panel not found!');
  }
};

// Force test function
window.forceShowChat = function() {
  const chatPanel = document.getElementById('panel-chat');
  const overlay = document.querySelector('.panel-overlay');
  
  if (chatPanel && overlay) {
    console.log('Force showing chat panel...');
    console.log('Panel before:', chatPanel.style.cssText);
    console.log('Panel classes before:', chatPanel.className);
    
    // Show overlay
    overlay.style.display = 'block';
    overlay.classList.add('active');
    
    // Force show chat panel with inline styles
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
    `;
    
    chatPanel.classList.add('active');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    document.body.classList.add('panel-open');
    
    console.log('Panel after:', chatPanel.style.cssText);
    console.log('Panel classes after:', chatPanel.className);
    console.log('Chat panel force shown successfully');
  } else {
    console.error('Chat panel or overlay not found!');
    console.log('Chat panel element:', chatPanel);
    console.log('Overlay element:', overlay);
  }
};

// Simple test function
window.simpleTest = function() {
  console.log('Simple test - checking elements:');
  console.log('Chat panel exists:', !!document.getElementById('panel-chat'));
  console.log('Overlay exists:', !!document.querySelector('.panel-overlay'));
  console.log('Chat button exists:', !!document.querySelector('[data-panel="chat"]'));
  
  const chatPanel = document.getElementById('panel-chat');
  if (chatPanel) {
    console.log('Chat panel HTML:', chatPanel.outerHTML.substring(0, 200));
  }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeChatSystem);
} else {
  initializeChatSystem();
}

console.log('DICTOLE Professional Chat Panel loaded successfully!');
