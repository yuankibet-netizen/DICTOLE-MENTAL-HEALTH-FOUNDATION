/* ========================================
   DICTOLE - Language Toggle (EN / Swahili)
   ======================================== */

const translations = {
  en: {
    navHome: 'Home',
    navAbout: 'About',
    navServices: 'Services',
    navMission: 'Mission/Vision',
    navContact: 'Contact',
    navBook: 'Book Appointment',
    close: 'Close',
    bookAppointment: 'Book an Appointment',
    bookAppointmentDesc: 'Schedule a consultation with our mental health professionals. We\'ll confirm your booking by phone or email.',
    yourName: 'Your Name',
    yourPhone: 'Your Phone',
    yourEmail: 'Your email',
    selectService: 'Select service',
    additionalNotes: 'Additional notes (optional)',
    requestBooking: 'Request Booking',
    newsletterTitle: 'Stay Updated',
    newsletterDesc: 'Subscribe for mental health tips, events, and foundation updates.',
    subscribe: 'Subscribe',
    newsletterNote: 'We respect your privacy. Unsubscribe anytime.',
    cookieTitle: 'We use cookies',
    cookieDesc: 'We use cookies to improve your experience and analyze site traffic. By continuing, you agree to our use of cookies. ',
    cookiePolicy: 'Privacy policy',
    cookieAccept: 'Accept',
    cookieDecline: 'Decline'
  },
  sw: {
    navHome: 'Nyumbani',
    navAbout: 'Kuhusu',
    navServices: 'Huduma',
    navMission: 'Lengo / Maono',
    navContact: 'Wasiliana',
    navBook: 'Kuandika Nafasi',
    close: 'Funga',
    bookAppointment: 'Kuandika Nafasi ya Mkutano',
    bookAppointmentDesc: 'Panga usuluhishi na wataalamu wetu wa afya ya akili. Tutathibitisha kuhusu ukumbusho wako kupitia simu au barua pepe.',
    yourName: 'Jina lako',
    yourPhone: 'Simu yako',
    yourEmail: 'Barua pepe yako',
    selectService: 'Chagua huduma',
    additionalNotes: 'Maelezo zaidi (hiari)',
    requestBooking: 'Omba Kuandika',
    newsletterTitle: 'Soma Habari Mpya',
    newsletterDesc: 'Jiandikishe kwa vidokezo vya afya ya akili, matukio, na habari za asasi.',
    subscribe: 'Jiandikishe',
    newsletterNote: 'Tunaheshimu faragha yako. Jiandikishe nje wakati wowote.',
    cookieTitle: 'Tunatumia vidakuzi',
    cookieDesc: 'Tunatumia vidakuzi kuboresha uzoefu wako na kuchambua trafiki ya tovuti. Kuendelea, unakubali matumizi yetu ya vidakuzi. ',
    cookiePolicy: 'Sera ya faragha',
    cookieAccept: 'Kubali',
    cookieDecline: 'Kataa'
  }
};

let currentLang = localStorage.getItem('dictole-lang') || 'en';

function applyTranslations(lang) {
  const t = translations[lang] || translations.en;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.textContent = t[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key]) el.placeholder = t[key];
  });
  const langSelect = document.getElementById('lang-select');
  if (langSelect) langSelect.value = lang;
  document.documentElement.lang = lang === 'sw' ? 'sw' : 'en';
}

function initI18n() {
  const langSelect = document.getElementById('lang-select');
  if (langSelect) {
    langSelect.value = currentLang;
    langSelect.addEventListener('change', (e) => {
      currentLang = e.target.value;
      localStorage.setItem('dictole-lang', currentLang);
      applyTranslations(currentLang);
    });
  }
  applyTranslations(currentLang);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initI18n);
} else {
  initI18n();
}
