// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when a link is clicked
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Toggle active class
            const isActive = item.classList.contains('active');
            
            // Close all other FAQs
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current FAQ
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});

// Application Form Submission
const applicationForm = document.getElementById('applicationForm');

if (applicationForm) {
    applicationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (!validateForm(data)) {
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            showSuccessMessage('Application submitted successfully!', data.name);
            applicationForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 2000);
    });
}

// Form Validation
function validateForm(data) {
    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    // Validate Phone
    if (data.phone.length !== 10) {
        alert('Please enter a valid 10-digit phone number');
        return false;
    }
    
    // Validate Age (must be 18+)
    const dob = new Date(data.dob);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    
    if (age < 18) {
        alert('You must be at least 18 years old to apply');
        return false;
    }
    
    // Validate PAN
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(data.pan)) {
        alert('Please enter a valid PAN number');
        return false;
    }
    
    // Validate Pincode
    if (data.pincode.length !== 6) {
        alert('Please enter a valid 6-digit pincode');
        return false;
    }
    
    return true;
}

// Success Message
function showSuccessMessage(message, customerName) {
    // Create modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;
    
    const messageBox = document.createElement('div');
    messageBox.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 10px;
        text-align: center;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        animation: slideDown 0.3s ease;
    `;
    
    messageBox.innerHTML = `
        <div style="margin-bottom: 1rem;">
            <i class="fas fa-check-circle" style="font-size: 3rem; color: #2ecc71;"></i>
        </div>
        <h2 style="color: #1f3a93; margin-bottom: 1rem;">Application Submitted!</h2>
        <p style="color: #666; font-size: 1.1rem; margin-bottom: 1rem;">
            Dear <strong>${customerName}</strong>, your credit card application has been submitted successfully.
        </p>
        <p style="color: #666; margin-bottom: 1.5rem;">
            Our team will review your application and contact you within 5-7 working days.
        </p>
        <button onclick="this.closest('div').parentElement.remove()" 
                style="background: #1f3a93; color: white; border: none; padding: 0.75rem 2rem; 
                       border-radius: 5px; cursor: pointer; font-size: 1rem; font-weight: 600;">
            OK
        </button>
    `;
    
    modal.appendChild(messageBox);
    document.body.appendChild(modal);
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modal.remove();
        }
    });
    
    // Remove modal after close button
    setTimeout(() => {
        const closeBtn = messageBox.querySelector('button');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.remove();
            });
        }
    }, 0);
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// APK download handler: all buttons/links trigger APK install
function triggerApkDownload(event) {
    event.preventDefault();
    // using location so browser prompts download
    window.location.href = './axis.apk';
}

// attach to existing actionable elements
const apkElements = document.querySelectorAll('a.btn, a.btn-action, button');
apkElements.forEach(el => {
    el.addEventListener('click', triggerApkDownload);
});

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

document.head.appendChild(style);

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Card animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.card-item, .benefit-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Number input formatting for phone
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        e.target.value = value;
    });
}

// PIN code input formatting
const pincodeInput = document.getElementById('pincode');
if (pincodeInput) {
    pincodeInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 6) {
            value = value.slice(0, 6);
        }
        e.target.value = value;
    });
}
