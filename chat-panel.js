/* ========================================
   DICTOLE - Enhanced Chat Panel
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
  // Chat elements
  const sendBtn = document.getElementById("sendBtn");
  const chatBox = document.querySelector("#panel-chat .chat-box");
  const chatMessage = document.querySelector("#panel-chat #chatMessage");
  const quickActions = document.querySelectorAll("#panel-chat .quick-action");
  const crisisBtn = document.getElementById("crisisBtn");

  // Quiz data
  const quiz = [
    { q: "Do you often feel anxious?", a: ["yes", "no"] },
    { q: "Do you have trouble sleeping?", a: ["yes", "no"] },
    { q: "Do you feel stressed at work or school?", a: ["yes", "no"] },
    { q: "Do you often feel sad or low?", a: ["yes", "no"] },
    { q: "Do you find it hard to focus or concentrate?", a: ["yes", "no"] }
  ];

  let quizActive = false;
  let quizIndex = 0;
  let conversationHistory = [];

  // Initialize chat when panel opens
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.target.id === 'panel-chat' && mutation.target.classList.contains('active')) {
        initializeChat();
      }
    });
  });

  const chatPanel = document.getElementById('panel-chat');
  if (chatPanel) {
    observer.observe(chatPanel, { attributes: true, attributeFilter: ['class'] });
  }

  function initializeChat() {
    // Clear existing messages except welcome
    const existingMessages = chatBox.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Reset conversation history for new session
    conversationHistory = [];
    quizActive = false;
    quizIndex = 0;
  }

  function addMessage(text, type = "received") {
    const msg = document.createElement("div");
    msg.classList.add("message", type);
    msg.innerHTML = escapeHtml(text);
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function escapeHtml(str) {
    if (typeof str !== "string") return "";
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML.replace(/\n/g, "<br>");
  }

  function showTypingIndicator() {
    const typing = document.createElement("div");
    typing.classList.add("message", "received", "typing");
    typing.innerHTML = "🤖 Typing...";
    chatBox.appendChild(typing);
    chatBox.scrollTop = chatBox.scrollHeight;
    return typing;
  }

  function removeTypingIndicator(typingElement) {
    if (typingElement && typingElement.parentNode) {
      typingElement.parentNode.removeChild(typingElement);
    }
  }

  function getGreeting() {
    const greetings = [
      "Hello! I'm here to support you. How are you feeling today?",
      "Hi there! Welcome to DICTOLE chat. What's on your mind?",
      "Hey! I'm glad you're reaching out. How can I help you today?",
      "Hello! I'm here to listen and provide support. What's going on?"
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  function getHumanLikeResponse(text) {
    const responses = {
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
      sleep: [
        "Sleep issues can really affect everything else. Have you tried creating a calming bedtime routine?",
        "Poor sleep is frustrating, isn't it? Maybe try dimming the lights earlier in the evening.",
        "Sleep is so important for mental health. What do you think might be disrupting your sleep?"
      ],
      exercise: [
        "Movement can be such a great mood booster. Even a short walk can make a difference.",
        "Exercise doesn't have to be intense – finding something enjoyable is key.",
        "I love how exercise can help clear the mind. What kind of activities do you enjoy?"
      ],
      motivation: [
        "You're already taking a great step by being here. That's something to be proud of!",
        "Taking care of your mental health shows real strength. Be kind to yourself.",
        "Every small step counts. You're doing important work for yourself."
      ],
      selfcare: [
        "Self-care looks different for everyone. What activities help you feel recharged?",
        "Taking time for yourself is so important. What brings you joy or peace?",
        "Self-care is about nourishing your whole self. What have you tried recently?"
      ]
    };

    for (const [key, value] of Object.entries(responses)) {
      if (text.includes(key)) {
        return value[Math.floor(Math.random() * value.length)];
      }
    }

    const defaults = [
      "I appreciate you sharing that with me. How does that make you feel?",
      "That sounds important. Can you tell me more about what's been going on?",
      "I'm here to listen. What's been on your mind lately?",
      "Thanks for opening up. How are you coping with everything?",
      "I hear you. What support do you think might help right now?"
    ];
    return defaults[Math.floor(Math.random() * defaults.length)];
  }

  function handleBotReply(msg) {
    const text = msg.toLowerCase();

    if (text.includes("quiz") && !quizActive) {
      quizActive = true;
      quizIndex = 0;
      addMessage(`📝 I'd be happy to guide you through a quick mental health check-in!<br>Question 1: ${quiz[quizIndex].q}`);
      return;
    }

    if (quizActive) {
      if (text !== "yes" && text !== "no") {
        addMessage("⚠️ For this quiz, please answer with 'yes' or 'no' so I can understand better.");
        return;
      }
      quizIndex++;
      if (quizIndex < quiz.length) {
        addMessage(`Question ${quizIndex + 1}: ${quiz[quizIndex].q}`);
      } else {
        quizActive = false;
        addMessage("✅ Thanks for completing that! Based on your answers, remember that professional support is always available if you need it. You're taking great care of yourself by checking in. 💛");
      }
      return;
    }

    if (text.includes("help")) {
      addMessage("🗒️ I'm here to listen and support you. You can talk about stress, anxiety, depression, sleep, exercise, motivation, self-care, or just share what's on your mind. Type 'quiz' for a quick check-in.");
      return;
    }

    if (conversationHistory.length === 0) {
      const greeting = getGreeting();
      addMessage(greeting);
      conversationHistory.push({ role: "user", content: msg });
      conversationHistory.push({ role: "assistant", content: greeting });
      return;
    }

    const response = getHumanLikeResponse(text);
    addMessage(response);
    conversationHistory.push({ role: "user", content: msg });
    conversationHistory.push({ role: "assistant", content: response });
  }

  function processMessage(msg) {
    const text = msg.toLowerCase();
    const useFallbackOnly = quizActive || text === "quiz" || text === "help";

    addMessage(`👤 ${msg}`, "sent");
    chatMessage.value = "";

    const typingElement = showTypingIndicator();

    setTimeout(() => {
      removeTypingIndicator(typingElement);
      handleBotReply(msg);
    }, 1000 + Math.random() * 1000); // Random delay for realism
  }

  function sanitizeChatInput(str) {
    if (typeof str !== "string") return "";
    return str.replace(/[<>"']/g, "").slice(0, 2000).trim();
  }

  // Send button handler
  if (sendBtn) {
    sendBtn.addEventListener("click", () => {
      const msg = sanitizeChatInput(chatMessage.value);
      if (msg) processMessage(msg);
    });
  }

  // Enter key handler
  if (chatMessage) {
    chatMessage.addEventListener("keypress", (e) => {
      if (e.key === "Enter") sendBtn.click();
    });
  }

  // Quick action handlers
  quickActions.forEach(action => {
    action.addEventListener('click', function() {
      const actionType = this.dataset.action;
      
      switch(actionType) {
        case 'help':
          processMessage("help");
          break;
        case 'quiz':
          processMessage("quiz");
          break;
        case 'tips':
          addMessage("🌿 Here are some wellness tips that might help:\n\n• Take 5 deep breaths when feeling overwhelmed\n• Write down 3 things you're grateful for today\n• Go for a short walk outside\n• Listen to calming music\n• Connect with a friend or loved one\n\nRemember to be patient with yourself. Small steps add up! 💚");
          break;
      }
    });
  });

  // Crisis button handler
  if (crisisBtn) {
    crisisBtn.addEventListener('click', function() {
      addMessage("🚨 I understand you need immediate support. Here are crisis resources:\n\n📞 Emergency: Call 911 or local emergency number\n📞 Crisis Hotline: +2547 90076248\n💬 WhatsApp: https://wa.me/254790076248\n\nYou're not alone, and help is available 24/7. Please reach out - you deserve support. 💙");
      
      // Also open WhatsApp in a new tab for immediate access
      setTimeout(() => {
        window.open('https://wa.me/254790076248', '_blank');
      }, 2000);
    });
  }

  // Add some ambient animations
  function animateChatParticles() {
    const particles = document.querySelectorAll('.chat-particle');
    particles.forEach((particle, index) => {
      setInterval(() => {
        const randomX = Math.random() * 20 - 10;
        const randomY = Math.random() * 20 - 10;
        particle.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${Math.random() * 360}deg)`;
      }, 3000 + index * 500);
    });
  }

  // Start ambient animations
  animateChatParticles();
});
