// Loading Screen Animation
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const mainContent = document.getElementById('mainContent');
    
    // Simulate loading time
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        mainContent.classList.add('show');
        
        // Remove loading screen after animation
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 3000);
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth Scrolling for Navigation Links
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

// Hero Service Icons Click Handler
document.querySelectorAll('.service-icon-hero').forEach(icon => {
    icon.addEventListener('click', function() {
        const service = this.getAttribute('data-service');
        const targetSection = document.querySelector('#services');
        const targetCard = document.querySelector(`[data-service="${service}"]`);
        
        // Scroll to services section
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Highlight the target card after scrolling
        setTimeout(() => {
            targetCard.classList.add('expanded');
            targetCard.style.animation = 'cardHighlight 0.5s ease-out';
            
            // Remove highlight after animation
            setTimeout(() => {
                targetCard.style.animation = '';
            }, 500);
        }, 1000);
    });
});

// Service Card Interactions
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function() {
        // Toggle expanded state
        this.classList.toggle('expanded');
        
        // Add animation class
        this.style.animation = 'none';
        this.offsetHeight; // Trigger reflow
        this.style.animation = 'cardExpand 0.3s ease-out';
    });
});

// Contact Button Interactions
document.querySelectorAll('.contact-button').forEach(button => {
    button.addEventListener('click', function() {
        const type = this.getAttribute('data-type');
        
        switch(type) {
            case 'email':
                window.open('mailto:info@ahmadnikzad.ltd', '_blank');
                break;
            case 'whatsapp1':
                openWhatsApp('905394362930');
                break;
            case 'whatsapp2':
                openWhatsApp('93782068888');
                break;
            case 'headquarters':
                // Show headquarters info with animation
                this.style.animation = 'buttonPulse 0.5s ease-out';
                setTimeout(() => {
                    this.style.animation = '';
                }, 500);
                break;
        }
    });
});

// WhatsApp Integration
function openWhatsApp(number) {
    const message = encodeURIComponent('Hello! I would like to inquire about your services.');
    window.open(`https://wa.me/${number}?text=${message}`, '_blank');
}

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .about-content, .contact-content, .stat-box, .feature-card').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Stats Counter Observer
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe stats section
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Active Navigation Link Highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        const rate = scrolled * -0.5;
        heroContent.style.transform = `translateY(${rate}px)`;
    }
});

// Service Card Hover Effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        if (!this.classList.contains('expanded')) {
            this.style.transform = 'translateY(0) scale(1)';
        }
    });
});

// Logo Animation on Load
window.addEventListener('load', () => {
    const logo = document.querySelector('.nav-logo .logo');
    if (logo) {
        logo.style.animation = 'logoBounce 0.6s ease-out';
    }
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes cardExpand {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); }
        100% { transform: scale(1); }
    }
    
    @keyframes cardHighlight {
        0% { transform: scale(1); box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); }
        50% { transform: scale(1.05); box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3); }
        100% { transform: scale(1); box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); }
    }
    
    @keyframes logoBounce {
        0% { transform: scale(0.8); opacity: 0; }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); opacity: 1; }
    }
    
    @keyframes buttonPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .nav-link.active::after {
        width: 100%;
    }
    
    .service-card.expanded {
        transform: scale(1.05);
        z-index: 10;
    }
    
    .service-card.expanded .service-details {
        display: block;
        animation: fadeInUp 0.3s ease-out;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .service-icon-hero {
        animation: float 6s ease-in-out infinite;
    }
    
    .service-icon-hero:nth-child(1) { animation-delay: 0s; }
    .service-icon-hero:nth-child(2) { animation-delay: 1.5s; }
    .service-icon-hero:nth-child(3) { animation-delay: 3s; }
    .service-icon-hero:nth-child(4) { animation-delay: 4.5s; }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
`;
document.head.appendChild(style);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Navbar background effect
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Initialize animations when page is fully loaded
window.addEventListener('load', () => {
    // Add entrance animations to service cards
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
    
    // Add entrance animations to stat boxes
    document.querySelectorAll('.stat-box').forEach((box, index) => {
        box.style.animationDelay = `${index * 0.2}s`;
        box.classList.add('fade-in');
    });
    
    // Add entrance animations to feature cards
    document.querySelectorAll('.feature-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
    
    // Trigger intersection observer
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
            el.classList.add('visible');
        }
    });
});
