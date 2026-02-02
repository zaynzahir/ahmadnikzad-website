/**
 * Modern Modular Enterprise Interactions
 * Focus: Precision, smoothness, and performance.
 */

// Add class to body to indicate JS is enabled
document.documentElement.classList.add('js-enabled');

document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initMagneticButtons();
    initMobileMenu();
    initStatsCounter();
    initNavbarScroll();
});

/**
 * 1. Reveal on Scroll
 * Uses IntersectionObserver to trigger animations when elements enter viewport.
 */
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach(el => observer.observe(el));
}

/**
 * 2. Magnetic Buttons
 * Adds a subtle "magnetic" pull effect to buttons on hover.
 */
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.magnetic-btn');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate distance from center
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) * 0.1; // Magnetic strength X
            const deltaY = (y - centerY) * 0.1; // Magnetic strength Y

            btn.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

/**
 * 3. Mobile Menu
 * Handles the hamburger menu toggle and closing on link click.
 */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link');

    if (!hamburger) return;

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Animate hamburger lines (simple cross toggle could be added here via CSS classes)
        hamburger.classList.toggle('open');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('open');
        });
    });
}

/**
 * 4. Stats Counter
 * Animates numbers from 0 to target value.
 */
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateValue(entry.target, 0, target, 2000);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
}

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // Easing function for smooth stop
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        
        obj.innerHTML = Math.floor(progress * (end - start) + start) + '+';
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

/**
 * 5. Navbar Scroll Effect
 * Adds a glass effect background when scrolling down.
 */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.05)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
}
