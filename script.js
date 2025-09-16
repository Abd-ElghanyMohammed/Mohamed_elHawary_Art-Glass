// Logo click sound effect
const logoImg = document.querySelector('.logo img');
logoImg.addEventListener('click', () => {
  const audio = document.getElementById('glassBreakSound');
  audio.currentTime = 0; // reset to start
  audio.play();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('active'));
});

// Language toggle
const langToggle = document.getElementById('langToggle');
const htmlElement = document.documentElement;

function switchLanguage(lang) {
  const elements = document.querySelectorAll('[data-en], [data-ar]');
  elements.forEach(element => {
    if (lang === 'ar') {
      element.textContent = element.getAttribute('data-ar') || element.textContent;
      element.placeholder = element.getAttribute('data-ar') || element.placeholder;
      element.style.direction = 'rtl';
    } else {
      element.textContent = element.getAttribute('data-en') || element.textContent;
      element.placeholder = element.getAttribute('data-en') || element.placeholder;
      element.style.direction = 'ltr';
    }
  });

  // Update HTML attributes
  htmlElement.lang = lang;

  // Update toggle button text
  langToggle.textContent = lang === 'ar' ? 'عربي | EN' : 'EN | AR';

  // Toggle RTL class for location popup
  const locationContent = document.querySelector('.location-content');
  if (locationContent) {
    locationContent.classList.toggle('rtl', lang === 'ar');
  }
}

langToggle.addEventListener('click', () => {
  const currentLang = htmlElement.lang;
  const newLang = currentLang === 'en' ? 'ar' : 'en';
  switchLanguage(newLang);
  langToggle.classList.toggle('active');
});

// Initialize with English
switchLanguage('en');

// Fade-in animation on scroll removed as per user request
// Glass effect on scroll removed as per user request

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero-section');
  if (hero) {
    hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
  }

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  if (scrolled > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Back to top button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // Basic form validation
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    alert('Please fill in all required fields.');
    return;
  }

  // Simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // Here you would typically send the form data to a server
  alert('Thank you for your message! We will get back to you soon.');
  contactForm.reset();
});

// Location popup functionality
const locationLink = document.querySelector('.location-link');
const locationPopup = document.getElementById('locationPopup');
const closeLocationBtn = document.getElementById('closeLocation');

locationLink.addEventListener('click', (e) => {
  e.preventDefault();
  locationPopup.classList.remove('hidden');
});

closeLocationBtn.addEventListener('click', () => {
  locationPopup.classList.add('hidden');
});

// Close popup when clicking on background
locationPopup.addEventListener('click', (e) => {
  if (e.target === locationPopup) {
    locationPopup.classList.add('hidden');
  }
});

// Testimonials carousel auto-scroll (optional)
let testimonialIndex = 0;
const testimonials = document.querySelectorAll('.testimonial');
const testimonialsContainer = document.querySelector('.testimonials-carousel');

function autoScrollTestimonials() {
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  testimonialsContainer.scrollTo({
    left: testimonials[testimonialIndex].offsetLeft,
    behavior: 'smooth'
  });
}

// Auto-scroll testimonials every 5 seconds
setInterval(autoScrollTestimonials, 5000);

// Projects gallery auto-scroll disabled for manual arrow control

// Projects gallery carousel functionality
const leftArrow = document.getElementById('leftArrow');
const rightArrow = document.getElementById('rightArrow');
const projects = document.querySelectorAll('.project-slide');
let currentProjectIndex = 0;

function showProject(index) {
  projects.forEach((project, i) => {
    if (i === index) {
      project.style.opacity = '0';
      project.style.transform = 'translateX(100%) scale(0.8)';
      project.style.display = 'block';
      setTimeout(() => {
        project.style.opacity = '1';
        project.style.transform = 'translateX(0) scale(1)';
      }, 50);
    } else {
      project.style.opacity = '0';
      project.style.transform = 'translateX(-100%) scale(0.8)';
      setTimeout(() => {
        project.style.display = 'none';
      }, 500);
    }
  });
}

leftArrow.addEventListener('click', () => {
  currentProjectIndex = (currentProjectIndex - 1 + projects.length) % projects.length;
  showProject(currentProjectIndex);
  clearInterval(autoFlipInterval);
  autoFlipInterval = setInterval(() => {
    currentProjectIndex = (currentProjectIndex + 1) % projects.length;
    showProject(currentProjectIndex);
  }, 10000);
});

rightArrow.addEventListener('click', () => {
  currentProjectIndex = (currentProjectIndex + 1) % projects.length;
  showProject(currentProjectIndex);
  clearInterval(autoFlipInterval);
  autoFlipInterval = setInterval(() => {
    currentProjectIndex = (currentProjectIndex + 1) % projects.length;
    showProject(currentProjectIndex);
  }, 10000);
});

// Initialize with first project visible
showProject(currentProjectIndex);

// Auto-flip projects every 10 seconds if no interaction
let autoFlipInterval = setInterval(() => {
  currentProjectIndex = (currentProjectIndex + 1) % projects.length;
  showProject(currentProjectIndex);
}, 10000);

// WhatsApp button shake animation every 10 seconds
setInterval(() => {
  const whatsappBtn = document.querySelector('.whatsapp-float');
  whatsappBtn.classList.add('shake');
  setTimeout(() => {
    whatsappBtn.classList.remove('shake');
  }, 500);
}, 10000);

// Promotional popup functionality
const promoPopup = document.getElementById('promoPopup');
const closePromoBtn = document.getElementById('closePromoBtn');
const viewOffersBtn = document.getElementById('viewOffersBtn');

// Show popup after 3 seconds
setTimeout(() => {
  promoPopup.classList.remove('hidden');
}, 1500);

closePromoBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  promoPopup.classList.add('minimized');
  promoPopup.classList.remove('hidden');
});

// Click minimized popup to restore
promoPopup.addEventListener('click', (e) => {
  if (promoPopup.classList.contains('minimized') && !e.target.closest('#closePromo')) {
    promoPopup.classList.remove('minimized');
  }
});

// Add click event for "View Offers" button
viewOffersBtn.addEventListener('click', () => {
  // Minimize the popup and scroll to products section
  promoPopup.classList.add('minimized');
  promoPopup.classList.remove('hidden');
  // Scroll to products section
  const productsSection = document.getElementById('products');
  if (productsSection) {
    productsSection.scrollIntoView({ behavior: 'smooth' });
  }
});

// Close promo popup when clicking outside (minimize instead of hide)
promoPopup.addEventListener('click', (e) => {
  if (e.target === promoPopup) {
    promoPopup.classList.add('minimized');
    promoPopup.classList.remove('hidden');
  }
});

// Shake popup every 10 seconds
setInterval(() => {
  promoPopup.classList.add('shake');
  setTimeout(() => {
    promoPopup.classList.remove('shake');
  }, 500);
}, 10000);

// Language confirmation popup functionality
const languagePopup = document.getElementById('languagePopup');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');

// Show language popup every 10 seconds
setInterval(() => {
  languagePopup.classList.remove('hidden');
}, 10000);

// Yes button: switch to English if not already
yesBtn.addEventListener('click', () => {
  if (htmlElement.lang === 'ar') {
    switchLanguage('en');
  }
  languagePopup.classList.add('hidden');
});

// No button: just hide the popup
noBtn.addEventListener('click', () => {
  languagePopup.classList.add('hidden');
});

// Notification bar functionality
const notificationBar = document.getElementById('notificationBar');
const closeNotificationBtn = document.getElementById('closeNotification');

closeNotificationBtn.addEventListener('click', () => {
  notificationBar.style.display = 'none';
});

// New code to handle close button on offer cards and slide bar toggle
const offerSlideBar = document.getElementById('offerSlideBar');

document.querySelectorAll('.offer-card-close-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const card = btn.closest('.product-card');
    if (card) {
      card.style.display = 'none';
      offerSlideBar.classList.remove('hidden');
    }
  });
});

offerSlideBar.addEventListener('click', () => {
  const firstCard = document.querySelector('.product-card');
  if (firstCard) {
    firstCard.style.display = 'block';
    offerSlideBar.classList.add('hidden');
  }
});

offerSlideBar.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    offerSlideBar.click();
  }
});

// Add outside click to close offer card
document.addEventListener('click', (e) => {
  const visibleCard = document.querySelector('.product-card[style*="display: block"]');
  if (visibleCard && !visibleCard.contains(e.target)) {
    visibleCard.style.display = 'none';
    offerSlideBar.classList.remove('hidden');
  }
});

// Language bar functionality
const languageBar = document.getElementById('languageBar');
const closeLanguageBtn = document.getElementById('closeLanguage');

// Show language bar every 10 seconds
setInterval(() => {
  languageBar.classList.add('show');
}, 10000);

// Show offers page after 3 seconds of page load
window.addEventListener('load', () => {
  setTimeout(() => {
    const offersPage = document.getElementById('offersPage');
    if (offersPage) {
      offersPage.style.display = 'block';
    }
  }, 3000);
});



