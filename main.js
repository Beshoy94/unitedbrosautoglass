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

// Vehicle Data
const vehicleData = {
    "Acura": ["MDX", "RDX", "TLX", "ILX"],
    "Audi": ["A3", "A4", "A6", "Q3", "Q5", "Q7"],
    "BMW": ["3 Series", "5 Series", "7 Series", "X1", "X3", "X5"],
    "Buick": ["Enclave", "Encore", "Envision"],
    "Cadillac": ["Escalade", "XT4", "XT5", "XT6", "CT4", "CT5"],
    "Chevrolet": ["Camaro", "Colorado", "Equinox", "Silverado", "Tahoe", "Traverse"],
    "Chrysler": ["300", "Pacifica"],
    "Dodge": ["Challenger", "Charger", "Durango"],
    "Ford": ["Bronco", "Edge", "Escape", "Explorer", "F-150", "Mustang"],
    "GMC": ["Acadia", "Canyon", "Sierra", "Terrain", "Yukon"],
    "Honda": ["Accord", "Civic", "CR-V", "Odyssey", "Pilot"],
    "Hyundai": ["Elantra", "Kona", "Palisade", "Santa Fe", "Sonata", "Tucson"],
    "Infiniti": ["Q50", "QX50", "QX60", "QX80"],
    "Jeep": ["Cherokee", "Compass", "Gladiator", "Grand Cherokee", "Wrangler"],
    "Kia": ["Forte", "K5", "Sorento", "Soul", "Sportage", "Telluride"],
    "Lexus": ["ES", "GX", "IS", "NX", "RX", "UX"],
    "Lincoln": ["Aviator", "Corsair", "Navigator", "Nautilus"],
    "Mazda": ["CX-5", "CX-9", "CX-30", "CX-50", "Mazda3"],
    "Mercedes-Benz": ["C-Class", "E-Class", "S-Class", "GLA", "GLC", "GLE"],
    "Nissan": ["Altima", "Frontier", "Pathfinder", "Rogue", "Sentra", "Titan"],
    "Ram": ["1500", "2500", "3500"],
    "Subaru": ["Ascent", "Crosstrek", "Forester", "Impreza", "Outback"],
    "Tesla": ["Model 3", "Model S", "Model X", "Model Y"],
    "Toyota": ["4Runner", "Camry", "Corolla", "Highlander", "Prius", "RAV4", "Tacoma", "Tundra"],
    "Volkswagen": ["Atlas", "Golf", "Jetta", "Passat", "Tiguan"],
    "Volvo": ["S60", "S90", "V60", "XC40", "XC60", "XC90"]
};

// Initialize Vehicle Dropdowns
document.addEventListener('DOMContentLoaded', () => {
    const yearSelect = document.getElementById('vehicle-year');
    const makeSelect = document.getElementById('vehicle-make');
    const modelSelect = document.getElementById('vehicle-model');

    if (yearSelect && makeSelect && modelSelect) {
        // Populate Years (2010 to current + 1)
        const currentYear = new Date().getFullYear();
        for (let i = currentYear + 1; i >= 2010; i--) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            yearSelect.appendChild(option);
        }

        // When Year is selected, enable Make
        yearSelect.addEventListener('change', () => {
            makeSelect.disabled = false;
            if (makeSelect.options.length === 1) {
                // Populate Makes
                Object.keys(vehicleData).sort().forEach(make => {
                    const option = document.createElement('option');
                    option.value = make;
                    option.textContent = make;
                    makeSelect.appendChild(option);
                });
            }
        });

        // When Make is selected, update and enable Model
        makeSelect.addEventListener('change', () => {
            const selectedMake = makeSelect.value;
            modelSelect.innerHTML = '<option value="" disabled selected>Model</option>';

            if (vehicleData[selectedMake]) {
                vehicleData[selectedMake].sort().forEach(model => {
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
