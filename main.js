// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-up').forEach(el => {
    observer.observe(el);
});

// Add fade-up to all service cards for delay effect
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.classList.add('fade-up');
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// Form Submission (Mock with real support)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        // e.preventDefault(); // Remove this to allow Formspree to actually receive it
        const submitBtn = contactForm.querySelector('button');
        const originalText = submitBtn.innerText;

        submitBtn.innerText = 'Sending...';
        // submitBtn.disabled = true; // Keep enabled so form submits

        // Note: Formspree will handle its own redirect unless AJAX is used.
        // This animation will show briefly before the page redirects.
    });
}


// Initialize Vehicle Dropdowns
document.addEventListener('DOMContentLoaded', () => {
    const yearSelect = document.getElementById('vehicle-year');
    const makeSelect = document.getElementById('vehicle-make');
    const modelSelect = document.getElementById('vehicle-model');

    let currentYearData = null;

    if (yearSelect && makeSelect && modelSelect) {
        // Populate Years (1992 to 2026)
        for (let i = 2026; i >= 1992; i--) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            yearSelect.appendChild(option);
        }

        // When Year is selected, fetch Make data for that year
        yearSelect.addEventListener('change', async () => {
            const year = yearSelect.value;
            makeSelect.disabled = true;
            modelSelect.disabled = true;
            makeSelect.innerHTML = '<option value="" disabled selected>Loading...</option>';
            modelSelect.innerHTML = '<option value="" disabled selected>Model</option>';

            try {
                const response = await fetch(`assets/car-data/${year}.json`);
                if (!response.ok) throw new Error('Data not found');
                currentYearData = await response.json();

                // Populate Makes
                makeSelect.innerHTML = '<option value="" disabled selected>Make</option>';
                Object.keys(currentYearData).sort().forEach(make => {
                    const option = document.createElement('option');
                    option.value = make;
                    option.textContent = make;
                    makeSelect.appendChild(option);
                });
                makeSelect.disabled = false;
            } catch (error) {
                console.error('Error loading car data:', error);
                makeSelect.innerHTML = '<option value="" disabled selected>Error loading makes</option>';
            }
        });

        // When Make is selected, update and enable Model
        makeSelect.addEventListener('change', () => {
            const selectedMake = makeSelect.value;
            modelSelect.innerHTML = '<option value="" disabled selected>Model</option>';

            if (currentYearData && currentYearData[selectedMake]) {
                currentYearData[selectedMake].forEach(model => {
                    const option = document.createElement('option');
                    option.value = model;
                    option.textContent = model;
                    modelSelect.appendChild(option);
                });
                modelSelect.disabled = false;
            } else {
                modelSelect.disabled = true;
            }
        });
    }
});

// Mobile Menu Toggle (Simplified)
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'rgba(10, 12, 16, 0.95)';
        navLinks.style.padding = '2rem';
        navLinks.style.backdropFilter = 'blur(20px)';
    });
}
