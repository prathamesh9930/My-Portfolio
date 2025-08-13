// Smooth Fade Text Rotation Animation
let textRotationInitialized = false;

function initTextRotation() {
    // Prevent multiple initializations
    if (textRotationInitialized) {
        return;
    }

    const element = document.querySelector('.typing-animation');
    if (!element) {
        return;
    }

    textRotationInitialized = true;

    // Read words from data attribute or use default
    const dataWords = element.getAttribute('data-words');
    let words = ['Software Developer', 'Programmer', 'Tech Enthusiast'];
    
    if (dataWords) {
        try {
            words = JSON.parse(dataWords);
        } catch (e) {
            // Use default words on error
        }
    }

    let currentIndex = 0;
    let isAnimating = false;

    function rotateText() {
        if (isAnimating) return;
        isAnimating = true;

        // Fade out
        element.style.opacity = '0';
        element.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            // Change text
            element.textContent = words[currentIndex];
            currentIndex = (currentIndex + 1) % words.length;
            
            // Fade in
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            
            setTimeout(() => {
                isAnimating = false;
            }, 200);
        }, 200);
    }

    // Set initial styles and ensure smooth transitions
    element.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
    element.textContent = words[0];
    currentIndex = 1;

    // Start rotation with a delay to ensure DOM is ready
    setTimeout(() => {
        setInterval(rotateText, 1500);
    }, 1000);
}

// Initialize when page loads
window.addEventListener('load', function() {
    setTimeout(initTextRotation, 500);
});

// Also try on DOMContentLoaded as backup
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initTextRotation, 1000);
});

// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

// Lenis animation frame
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

console.log('Mobile navigation elements:', { hamburger, navMenu, navLinks: navLinks.length });

function mobileMenu() {
    console.log('Mobile menu toggled');
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
}

function closeMenu() {
    console.log('Closing mobile menu');
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
}

if (hamburger && navMenu) {
    console.log('Setting up mobile navigation');
    
    hamburger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        mobileMenu();
    });
    
    // Close menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            console.log('Nav link clicked, closing menu');
            closeMenu();
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            closeMenu();
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });
} else {
    console.error('Mobile navigation elements not found:', { hamburger, navMenu });
}

// Remove duplicate mobile navigation code - handled above

// Optimized Navbar scroll effect with theme support
let lastScrollY = 0;
const navbar = document.querySelector('.navbar');

function updateNavbar() {
    if (!navbar) return;
    
    const scrollY = window.scrollY;
    const isDarkTheme = document.body.getAttribute('data-theme') === 'dark';
    
    if (scrollY > 100) {
        navbar.classList.add('scrolled');
        if (isDarkTheme) {
            navbar.style.background = 'rgba(26, 26, 46, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.classList.remove('scrolled');
        if (isDarkTheme) {
            navbar.style.background = 'rgba(26, 26, 46, 0.95)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
        navbar.style.boxShadow = 'none';
        navbar.style.backdropFilter = 'blur(10px)';
    }
    
    lastScrollY = scrollY;
}

// Throttled scroll listener
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            updateNavbar();
            ticking = false;
        });
        ticking = true;
    }
});

// Smooth scrolling for navigation links (using Lenis)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            lenis.scrollTo(target, {
                offset: -80,
                duration: 1.5,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            });
        }
    });
});

// Optimized Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -10% 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            // Unobserve after animation to improve performance
            animationObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Lightweight animation initialization
function initializeAnimations() {
    const elementsToAnimate = document.querySelectorAll(`
        .hero-text,
        .hero-image,
        .about-header,
        .about-left,
        .about-right,
        .section-header,
        .skill-category,
        .timeline-item,
        .certificate-card,
        .project-card,
        .contact-info,
        .contact-form
    `);
    
    elementsToAnimate.forEach((element, index) => {
        element.classList.add('animate-element');
        // Add slight delay for stagger effect
        element.style.animationDelay = `${(index % 6) * 0.1}s`;
        animationObserver.observe(element);
    });
}

// Contact form specific animations
function initContactFormAnimations() {
    const formFields = document.querySelectorAll('.form-field-animate');
    const contactSection = document.querySelector('.contact');
    
    // Create observer for contact section
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Animate form fields with staggered delay
                formFields.forEach((field, index) => {
                    setTimeout(() => {
                        field.classList.add('revealed');
                    }, index * 200);
                });
                
                contactObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    if (contactSection) {
        contactObserver.observe(contactSection);
    }
    
    // Enhanced form field interactions
    formFields.forEach(field => {
        const input = field.querySelector('input, textarea');
        const label = field.querySelector('label');
        
        if (input && label) {
            // Focus effects
            input.addEventListener('focus', () => {
                field.style.transform = 'translateX(5px)';
                label.style.color = 'var(--text-accent)';
            });
            
            input.addEventListener('blur', () => {
                field.style.transform = 'translateX(0)';
                if (!input.value) {
                    label.style.color = '';
                }
            });
            
            // Input validation animations
            input.addEventListener('input', () => {
                if (input.checkValidity()) {
                    field.classList.add('valid');
                    field.classList.remove('invalid');
                } else if (input.value) {
                    field.classList.add('invalid');
                    field.classList.remove('valid');
                }
            });
        }
    });
    
    // Send button special effects
    const sendButton = document.querySelector('.btn-send-animate');
    if (sendButton) {
        sendButton.addEventListener('mouseenter', () => {
            sendButton.style.animationPlayState = 'running';
        });
        
        sendButton.addEventListener('mouseleave', () => {
            sendButton.style.animationPlayState = 'paused';
        });
        
        // Click effect
        sendButton.addEventListener('click', () => {
            sendButton.style.transform = 'scale(0.95)';
            setTimeout(() => {
                sendButton.style.transform = '';
            }, 150);
        });
    }
}

// Optimized counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat h4[data-count]');
    
    if (counters.length === 0) {
        console.log('No counters found');
        return;
    }
    
    console.log('Found counters:', counters.length);
    
    counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute('data-count')) || 1;
        let current = 0;
        const increment = target / 20; // Faster animation for mobile
        
        console.log('Animating counter:', target);
        
        // Set initial text to 0+
        counter.textContent = '0+';
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + '+';
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + '+';
            }
        }, 80); // Slightly faster for mobile
    });
}

// Trigger counter animation when about section is visible
const aboutSection = document.querySelector('.about');
let countersAnimated = false;

if (aboutSection) {
    console.log('About section found, setting up observer');
    
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                console.log('About section visible, animating counters');
                // Small delay to ensure smooth animation
                setTimeout(() => animateCounters(), 200);
                countersAnimated = true;
                aboutObserver.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1, // Lower threshold for mobile
        rootMargin: '0px 0px -100px 0px' // Trigger earlier
    });
    
    aboutObserver.observe(aboutSection);
} else {
    console.log('About section not found');
}

// Optimized Contact form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        showNotification('Sending message...', 'info');
        
        setTimeout(() => {
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        }, 1000);
    });
}

// Lightweight notification system
function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="close-notification">&times;</button>
    `;
    
    const colors = {
        success: '#4CAF50',
        error: '#f44336',
        info: '#2196F3'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });
    
    // Close functionality
    const closeBtn = notification.querySelector('.close-notification');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        margin-left: 10px;
    `;
    
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Optimized scroll to top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 20px;
    opacity: 0;
    visibility: hidden;
    z-index: 1000;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
`;

document.body.appendChild(scrollToTopBtn);

// Show/hide scroll button with optimized scroll listener
let scrollButtonVisible = false;
function updateScrollButton() {
    const shouldShow = window.pageYOffset > 300;
    
    if (shouldShow && !scrollButtonVisible) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
        scrollButtonVisible = true;
    } else if (!shouldShow && scrollButtonVisible) {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
        scrollButtonVisible = false;
    }
}

// Add to existing scroll listener
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            updateNavbar();
            updateScrollButton();
            ticking = false;
        });
        ticking = true;
    }
});

// Scroll to top with Lenis
scrollToTopBtn.addEventListener('click', () => {
    lenis.scrollTo(0, {
        duration: 2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });
});

// Optimized project card interactions
function initializeProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
}

// Active navigation highlighting with Lenis
function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    const scrollTop = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initializeAnimations();
    initializeProjectCards();
    initializeThemeToggle();
    initContactFormAnimations();
    
    // Update active nav on scroll
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateActiveNav();
                ticking = false;
            });
            ticking = true;
        }
    });
});

// Theme Toggle Functionality
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;
    
    console.log('Initializing theme toggle');
    console.log('Theme toggle element:', themeToggle);
    console.log('Theme icon element:', themeIcon);
    
    // Check for saved theme preference or default to 'dark' (primary theme)
    const currentTheme = localStorage.getItem('theme') || 'dark';
    console.log('Current theme from localStorage:', currentTheme);
    
    body.setAttribute('data-theme', currentTheme);
    
    // Update icon based on current theme (dark is default, so show sun icon)
    updateThemeIcon(currentTheme);
    
    // Update navbar for initial theme
    updateNavbar();
    
    // Ensure theme toggle is visible and functional on mobile
    if (themeToggle) {
        themeToggle.style.display = 'flex';
        themeToggle.style.zIndex = '1002';
        
        themeToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Theme toggle clicked');
            
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            console.log('Switching from', currentTheme, 'to', newTheme);
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
            
            // Update navbar when theme changes
            updateNavbar();
            
            // Add a subtle animation to the toggle button
            themeToggle.style.transform = 'scale(0.95)';
            setTimeout(() => {
                themeToggle.style.transform = 'scale(1)';
            }, 150);
            
            // Force reflow for mobile devices
            body.offsetHeight;
        });
        
        // Add touch event support for mobile
        if ('ontouchstart' in window) {
            console.log('Adding touch events for mobile');
            
            themeToggle.addEventListener('touchstart', function(e) {
                e.preventDefault();
                this.style.transform = 'scale(0.95)';
            });
            
            themeToggle.addEventListener('touchend', function(e) {
                e.preventDefault();
                this.style.transform = 'scale(1)';
            });
        }
    } else {
        console.error('Theme toggle element not found!');
    }
    
    if (themeIcon) {
        console.log('Theme icon found, updating to:', currentTheme);
        updateThemeIcon(currentTheme);
    } else {
        console.error('Theme icon element not found!');
    }
}

function updateThemeIcon(theme) {
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
        if (theme === 'light') {
            themeIcon.className = 'fas fa-moon';
        } else {
            themeIcon.className = 'fas fa-sun';
        }
    }
}

// Performance monitoring
window.addEventListener('load', () => {
    // Portfolio fully loaded
});
