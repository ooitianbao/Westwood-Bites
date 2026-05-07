// Professional restaurant website interactions
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const reserveButtons = document.querySelectorAll('.menu-action');
const menuFilters = document.querySelectorAll('.category-btn');
const menuItems = document.querySelectorAll('.menu-item');
const fadeElements = document.querySelectorAll('.fade-in-up');
const bookingForm = document.getElementById('bookingForm');
const bookingMessage = document.getElementById('bookingMessage');

// Mobile navigation toggle
function toggleNav() {
    if (!navMenu) return;
    navMenu.classList.toggle('open');
    navToggle.classList.toggle('active');
}
navToggle?.addEventListener('click', toggleNav);

// Close mobile menu when clicking nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
        const targetId = link.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
            const target = document.querySelector(targetId);
            if (target) {
                event.preventDefault();
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        }
    });
});

// Navbar scroll effect
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar-overlay');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        navbar?.classList.add('scrolled');
    } else {
        navbar?.classList.remove('scrolled');
    }

    lastScrollTop = scrollTop;
});

// Intersection Observer for fade-in animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => observer.observe(el));

// Menu filtering with enhanced animations
menuFilters.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.category || 'all';

        menuFilters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        menuItems.forEach(item => {
            const matches = filter === 'all' || item.dataset.category === filter;
            if (matches) {
                item.style.display = 'block';
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.transition = 'all 0.5s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 10);
            } else {
                item.style.transition = 'all 0.3s ease';
                item.style.opacity = '0';
                item.style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Reservation form handling
bookingForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(bookingForm);

    bookingMessage.textContent = 'Processing your reservation...';
    bookingMessage.style.color = '#d4af37';

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        bookingMessage.textContent = 'Reservation confirmed! We look forward to welcoming you.';
        bookingMessage.style.color = '#4CAF50';
        bookingForm.reset();
    } catch (error) {
        bookingMessage.textContent = 'Sorry, there was an error. Please try again.';
        bookingMessage.style.color = '#f44336';
    }
});

// Parallax effect for about section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.about-parallax');

    parallaxElements.forEach(el => {
        const rate = scrolled * -0.5;
        el.style.transform = `translateY(${rate}px)`;
    });
});

// Initialize page with enhanced immersive experience
document.addEventListener('DOMContentLoaded', () => {
    // Enhanced loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
    }, 200);

    // Set active nav link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-overlay .nav-link');

    const updateActiveNav = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Initial call
});

menuFilters.forEach(button => {
    button.addEventListener('click', () => {
        menuFilters.forEach(item => item.classList.remove('active'));
        button.classList.add('active');
        const category = button.dataset.category;
        menuItems.forEach(item => {
            const matches = category === 'all' || item.dataset.category === category;
            item.style.display = matches ? 'grid' : 'none';
            if (matches) {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.transition = 'all 0.5s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 10);
            }
        });
    });
});

// Add hover effects for menu items
menuItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-5px) scale(1.02)';
        item.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
        item.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
    });
});

reserveButtons.forEach(button => {
    button.addEventListener('click', () => {
        const dishName = button.dataset.dish;
        const requestInput = document.getElementById('requests');
        if (requestInput) {
            requestInput.value = `Looking forward to enjoying ${dishName}. Please reserve the best table.`;
            requestInput.focus();
        }
        const reservationSection = document.getElementById('reservation');
        if (reservationSection) {
            const top = reservationSection.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

const socialFeed = [
    'New booking confirmed for Chef\'s Table this Friday.',
    'A 5-star guest review just posted on Instagram.',
    'Private dining room reserved for a VIP celebration.',
    'Tonight\'s lobster course is the most requested item.',
    'Chef\'s signature dish sold out for the weekend.',
    'Exclusive wine pairing dinner available next month.'
];
const ticker = document.querySelector('.social-ticker');
let feedIndex = 0;

function rotateFeed() {
    if (!ticker) return;
    ticker.style.opacity = '0';
    ticker.style.transform = 'translateY(10px)';
    setTimeout(() => {
        feedIndex = (feedIndex + 1) % socialFeed.length;
        ticker.innerHTML = `<strong>Live feed:</strong> ${socialFeed[feedIndex]}`;
        ticker.style.transition = 'all 0.5s ease';
        ticker.style.opacity = '1';
        ticker.style.transform = 'translateY(0)';
    }, 250);
}
setInterval(rotateFeed, 5200);

window.addEventListener('scroll', () => {
    if (aboutParallax) {
        const offset = window.scrollY * Number(aboutParallax.dataset.speed || 0.22);
        aboutParallax.style.transform = `translateY(${offset}px)`;
    }
    const currentScroll = window.scrollY + 120;
    navLinks.forEach(link => {
        if (!link.hash) return;
        const section = document.querySelector(link.hash);
        if (!section) return;
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        if (currentScroll >= top && currentScroll < bottom) {
            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');
        }
    });
});

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Smooth scrolling for navigation links
document.querySelectorAll('.navbar-overlay .nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const top = targetSection.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

if (bookingForm) {
    bookingForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(bookingForm);
        const submitButton = bookingForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Booking...';
        submitButton.disabled = true;
        try {
            const response = await fetch('data.php', { method: 'POST', body: formData });
            const result = await response.text();
            bookingMessage.textContent = result;
            bookingMessage.style.color = result.toLowerCase().includes('success') ? 'var(--accent)' : '#f65b5b';
        } catch (error) {
            bookingMessage.textContent = 'Something went wrong. Please try again or contact us directly.';
            bookingMessage.style.color = '#f65b5b';
            console.error(error);
        }
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    });
}
