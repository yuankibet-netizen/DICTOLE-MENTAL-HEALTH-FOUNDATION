// Enhanced Form Handler - Direct Gmail Integration
// This file provides direct Gmail integration without server requirements

// Direct Gmail integration - no server or password needed
async function submitContactForm(data) {
  return handleGmailSubmission(data);
}

function handleGmailSubmission(data) {
  const { formType = 'contact', name, email, phone, message, service, date, time } = data;
  
  let subject = '';
  let body = '';
  
  switch (formType) {
    case 'newsletter':
      subject = encodeURIComponent('Newsletter Subscription - DICTOLE Mental Health Foundation');
      body = encodeURIComponent('Hello DICTOLE Team,\n\nPlease add me to your newsletter subscription list.\n\nEmail: ' + email + '\n\nThank you!');
      break;
      
    case 'appointment':
      subject = encodeURIComponent('Appointment Request - ' + name);
      body = encodeURIComponent(
        'Hello DICTOLE Mental Health Foundation,\n\n' +
        'I would like to book an appointment:\n\n' +
        'Name: ' + name + '\n' +
        'Email: ' + email + '\n' +
        'Phone: ' + (phone || 'Not provided') + '\n' +
        'Service: ' + (service || 'Not specified') + '\n' +
        'Preferred Date: ' + (date || 'Not specified') + '\n' +
        'Preferred Time: ' + (time || 'Not specified') + '\n\n' +
        'Additional Notes:\n' + (message || 'None') + '\n\n' +
        'Please confirm my appointment by phone or email.\n\n' +
        'Thank you!'
      );
      break;
      
    case 'dispute':
      subject = encodeURIComponent('Dispute Submission - ' + name);
      body = encodeURIComponent(
        'Hello DICTOLE Mental Health Foundation,\n\n' +
        'I would like to raise a dispute regarding your services:\n\n' +
        'Name: ' + name + '\n' +
        'Email: ' + email + '\n' +
        'Order/Service ID: ' + (data.orderId || 'Not provided') + '\n\n' +
        'Dispute Details:\n' + data.dispute + '\n\n' +
        'Please review this matter and respond at your earliest convenience.\n\n' +
        'Thank you!'
      );
      break;
      
    default:
      subject = encodeURIComponent('Contact Form - ' + name);
      body = encodeURIComponent(
        'Hello DICTOLE Mental Health Foundation,\n\n' +
        message + '\n\n' +
        'From:\n' +
        'Name: ' + name + '\n' +
        'Email: ' + email + '\n\n' +
        'Please respond to my inquiry.\n\n' +
        'Thank you!'
      );
      break;
  }
  
  // Create Gmail URL - Send to DICTOLE foundation email
  const gmailUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=dictolementalhealthfoundation@gmail.com&su=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  
  console.log('Opening Gmail with URL:', gmailUrl);
  
  // Open Gmail in new tab with fallback
  try {
    const newWindow = window.open(gmailUrl, '_blank', 'width=800,height=600');
    console.log('Gmail window opened:', newWindow);
    
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      // Popup blocked - open in same tab
      console.log('Popup blocked, opening in same tab');
      window.location.href = gmailUrl;
    }
  } catch (error) {
    console.error('Error opening Gmail:', error);
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(gmailUrl).then(() => {
      alert('Gmail link copied to clipboard. Please paste in your browser address bar.');
    }).catch(() => {
      alert('Please manually go to Gmail and compose an email to dictolementalhealthfoundation@gmail.com');
    });
  }
  
  return { 
    message: 'Opening Gmail... Please send the email to complete your submission.',
    gmail: true 
  };
}

// Enhanced form feedback
function showEnhancedFormFeedback(form, type, message, isGmail = false) {
  // Remove existing feedback
  const existing = form.querySelector('.form-feedback');
  if (existing) existing.remove();
  
  const feedback = document.createElement('div');
  feedback.className = 'form-feedback form-feedback--' + type;
  feedback.style.cssText = 
    'padding: 16px 20px;' +
    'margin: 12px 0;' +
    'border-radius: 12px;' +
    'font-weight: 500;' +
    'animation: slideDown 0.4s ease;' +
    'backdrop-filter: blur(10px);' +
    'border: 1px solid ' + (type === 'success' ? '#10b981' : '#ef4444') + ';';
  
  if (type === 'success') {
    feedback.style.background = 'linear-gradient(135deg, rgba(16, 185, 129, 0.9) 0%, rgba(5, 150, 105, 0.9) 100%)';
    feedback.style.color = 'white';
    feedback.style.boxShadow = '0 8px 32px rgba(16, 185, 129, 0.3)';
  } else {
    feedback.style.background = 'linear-gradient(135deg, rgba(239, 68, 68, 0.9) 0%, rgba(220, 38, 38, 0.9) 100%)';
    feedback.style.color = 'white';
    feedback.style.boxShadow = '0 8px 32px rgba(239, 68, 68, 0.3)';
  }
  
  let innerHTML = 
    '<div style="display: flex; align-items: center; gap: 12px; margin-bottom: ' + (isGmail ? '12px' : '0') + ';">' +
      '<span style="font-size: 20px;">' + (type === 'success' ? '✅' : '⚠️') + '</span>' +
      '<span style="font-size: 16px; line-height: 1.4;">' + message + '</span>' +
    '</div>';
  
  if (isGmail) {
    innerHTML += 
      '<div style="margin-top: 8px; font-size: 14px; opacity: 0.95; line-height: 1.5;">' +
        '<strong>📧 Gmail opened in new tab</strong><br>' +
        'Please send the email to complete your submission.<br>' +
        '<div style="margin-top: 8px;">' +
          '<strong>Alternative contact options:</strong><br>' +
          '📞 <a href="tel:+254790076248" style="color: white; text-decoration: underline;">Call us</a> | ' +
          '💬 <a href="https://wa.me/254790076248" target="_blank" style="color: white; text-decoration: underline;">WhatsApp</a>' +
        '</div>' +
      '</div>';
  }
  
  feedback.innerHTML = innerHTML;
  
  form.insertBefore(feedback, form.firstChild);
  
  // Auto-remove after 10 seconds for Gmail messages
  const timeout = isGmail ? 10000 : 5000;
  setTimeout(() => {
    if (feedback.parentNode) {
      feedback.style.opacity = '0';
      feedback.style.transform = 'translateY(-10px)';
      setTimeout(() => feedback.remove(), 300);
    }
  }, timeout);
}

// Enhanced button state management
function setEnhancedFormState(form, state) {
  const btn = form.querySelector('button[type="submit"]');
  if (!btn) return;
  
  if (state === 'loading') {
    btn.disabled = true;
    btn.dataset.originalText = btn.textContent;
    btn.innerHTML = 
      '<span style="display: inline-flex; align-items: center; gap: 10px;">' +
        '<span style="width: 18px; height: 18px; border: 2px solid transparent; border-top: 2px solid currentColor; border-radius: 50%; animation: spin 1s linear infinite;"></span>' +
        'Opening Gmail...' +
      '</span>';
    btn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    btn.style.transform = 'scale(1.05)';
  } else {
    btn.disabled = false;
    btn.textContent = btn.dataset.originalText || 'Submit';
    btn.style.background = '';
    btn.style.transform = '';
  }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = 
  '@keyframes slideDown {' +
    'from { opacity: 0; transform: translateY(-20px); }' +
    'to { opacity: 1; transform: translateY(0); }' +
    '}' +
  '@keyframes spin {' +
    'to { transform: rotate(360deg); }' +
    '}' +
  '.form-feedback {' +
    'transition: all 0.3s ease;' +
    '}';
document.head.appendChild(style);

// Export functions for use in other scripts
window.submitContactForm = submitContactForm;
window.showEnhancedFormFeedback = showEnhancedFormFeedback;
window.setEnhancedFormState = setEnhancedFormState;
