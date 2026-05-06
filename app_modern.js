// High-end restaurant website interactions
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const reserveButtons = document.querySelectorAll('.menu-action');
const menuFilters = document.querySelectorAll('.category-btn');
const menuItems = document.querySelectorAll('.menu-item');
const fadeElements = document.querySelectorAll('.fade-in-up');
const bookingForm = document.getElementById('bookingForm');
const bookingMessage = document.getElementById('bookingMessage');
const aboutParallax = document.querySelector('.about-parallax');

function toggleNav() {
    if (!navMenu) return;
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navMenu.classList.toggle('open');
}
navToggle?.addEventListener('click', toggleNav);
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
    });
});

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

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15 });
fadeElements.forEach(el => observer.observe(el));

menuFilters.forEach(button => {
    button.addEventListener('click', () => {
        menuFilters.forEach(item => item.classList.remove('active'));
        button.classList.add('active');
        const category = button.dataset.category;
        menuItems.forEach(item => {
            const matches = category === 'all' || item.dataset.category === category;
            item.style.display = matches ? 'grid' : 'none';
        });
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
    'New booking confirmed for Chef’s Table this Friday.',
    'A 5-star guest review just posted on Instagram.',
    'Private dining room reserved for a VIP celebration.',
    'Tonight’s lobster course is the most requested item.',
];
const ticker = document.querySelector('.social-ticker');
let feedIndex = 0;
function rotateFeed() {
    if (!ticker) return;
    feedIndex = (feedIndex + 1) % socialFeed.length;
    ticker.innerHTML = `<strong>Live feed:</strong> ${socialFeed[feedIndex]}`;
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
