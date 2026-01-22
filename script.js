// ====================================
// URWA PORTFOLIO - Main JavaScript
// Minimal, editorial fashion portfolio
// ====================================

// ==================== NAVIGATION ====================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.querySelector('.nav-menu');

// Mobile menu toggle
if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
}

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu && mobileToggle) {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ==================== INTERSECTION OBSERVER ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe photo items
const photoItems = document.querySelectorAll('.photo-item');
photoItems.forEach(item => {
    fadeInObserver.observe(item);
});

// Observe about content
const aboutContent = document.querySelector('.about-content');
if (aboutContent) {
    fadeInObserver.observe(aboutContent);
}

// Observe about background
const aboutBackground = document.getElementById('aboutBackground');
if (aboutBackground) {
    fadeInObserver.observe(aboutBackground);
}

// Observe contact container
const contactContainer = document.querySelector('.contact-container');
if (contactContainer) {
    fadeInObserver.observe(contactContainer);
}

// ==================== PROJECT MODAL ====================
const modal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');
const modalCategory = document.getElementById('modalCategory');

// Project data
const projectData = {
    1: {
        title: 'Individual Fashion Project',
        category: 'Pattern Cutting and Garment Construction'
    },
    2: {
        title: 'Styling and Visual Exploration',
        category: 'Fashion Styling and Creative Direction'
    },
    3: {
        title: 'Trend Forecasting Study',
        category: 'Research and Concept Development'
    }
};

// Open modal when project card is clicked
projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-project');
        const project = projectData[projectId];
        
        if (project && modalTitle && modalCategory) {
            modalTitle.textContent = project.title;
            modalCategory.textContent = project.category;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

// Close modal when clicking overlay
const modalOverlay = document.querySelector('.modal-overlay');
if (modalOverlay) {
    modalOverlay.addEventListener('click', closeModal);
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// ==================== HERO BACKGROUND SCROLL EFFECT ====================
const heroImage = document.getElementById('heroImage');
const heroSection = document.querySelector('.hero');

function updateHeroBackground() {
    if (!heroImage || !heroSection) return;
    
    const scrollPosition = window.scrollY;
    const heroHeight = heroSection.offsetHeight;
    
    // Calculate scroll progress (0 to 1) - much faster appearance (0.1 = appears after 10% scroll)
    const scrollProgress = Math.min(scrollPosition / (heroHeight * 0.1), 1);
    
    // Update opacity based on scroll (starts at 0, reaches 0.2 very quickly)
    const opacity = Math.min(scrollProgress * 0.2, 0.2);
    
    // Update scale for parallax effect (reduced for faster appearance)
    const scale = 1 + (scrollProgress * 0.03);
    
    // Apply transformations
    heroImage.style.opacity = opacity;
    heroImage.style.transform = `scale(${scale})`;
    
    // Add visible class when image starts appearing
    if (opacity > 0.01) {
        heroImage.classList.add('visible');
    } else {
        heroImage.classList.remove('visible');
    }
}

// Throttle scroll events for performance
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateHeroBackground();
            ticking = false;
        });
        ticking = true;
    }
});

// Initial call
updateHeroBackground();

// ==================== PAGE LOAD ANIMATION ====================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.6s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Preload hero image
    if (heroImage) {
        const img = new Image();
        img.src = 'images/DSC_2936.JPG';
        img.onload = () => {
            heroImage.style.backgroundImage = `url('${img.src}')`;
        };
    }
});

// ==================== INITIALIZATION ====================
console.log('Urwa Portfolio - Initialized');
