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


// Initialize Vehicle Dropdowns using NHTSA API
document.addEventListener('DOMContentLoaded', () => {
    const yearSelect = document.getElementById('vehicle-year');
    const makeSelect = document.getElementById('vehicle-make');
    const modelSelect = document.getElementById('vehicle-model');

    if (!yearSelect || !makeSelect || !modelSelect) return;

    // 1. Populate Years (1990 to Current + 1)
    const currentYear = new Date().getFullYear();
    for (let i = currentYear + 1; i >= 1990; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        yearSelect.appendChild(option);
    }

    // 2. Fetch All Makes (Filtered for Relevance)
    const RELEVANT_MAKES = [
        "ACURA",
        "ALFA ROMEO",
        "AMC",
        "ASTON MARTIN",
        "AUDI",
        "BENTLEY",
        "BMW",
        "BUICK",
        "CADILLAC",
        "CHEVROLET",
        "CHRYSLER",
        "DELOREAN",
        "DODGE",
        "FERRARI",
        "FIAT",
        "FISKER",
        "FORD",
        "GENESIS",
        "GMC",
        "HONDA",
        "HUMMER",
        "HYUNDAI",
        "INFINITI",
        "ISUZU",
        "JAGUAR",
        "JEEP",
        "KARMA",
        "KIA",
        "KOENIGSEGG",
        "LAMBORGHINI",
        "LAND ROVER",
        "LEXUS",
        "LINCOLN",
        "LOTUS",
        "LUCID",
        "MASERATI",
        "MAYBACH",
        "MAZDA",
        "MCLAREN",
        "MERCEDES-BENZ",
        "MERCURY",
        "MINI",
        "MITSUBISHI",
        "NISSAN",
        "PEUGEOT",
        "POLESTAR",
        "PONTIAC",
        "PORSCHE",
        "RAM",
        "RENAULT",
        "RIVIAN",
        "ROLLS-ROYCE",
        "SAAB",
        "SATURN",
        "SCION",
        "SHELBY",
        "SMART",
        "SUBARU",
        "SUZUKI",
        "TESLA",
        "TOYOTA",
        "VINFAST",
        "VOLKSWAGEN",
        "VOLVO"
    ];

    async function fetchMakes() {
        makeSelect.innerHTML = '<option value="" disabled selected>Loading Makes...</option>';
        try {
            const types = ['passenger%20car', 'truck', 'multipurpose%20passenger%20vehicle%20(mpv)'];
            let fetchedMakes = new Set();

            for (const type of types) {
                const res = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/${type}?format=json`);
                const json = await res.json();
                json.Results.forEach(item => {
                    if (item.MakeName) {
                        const name = item.MakeName.trim().toUpperCase();
                        if (RELEVANT_MAKES.includes(name)) {
                            fetchedMakes.add(name);
                        }
                    }
                });
            }

            const sortedMakes = Array.from(fetchedMakes).sort();

            makeSelect.innerHTML = '<option value="" disabled selected>Make</option>';
            sortedMakes.forEach(make => {
                const option = document.createElement('option');
                option.value = make;
                option.textContent = make.charAt(0) + make.slice(1).toLowerCase(); // Capitalize first letter
                makeSelect.appendChild(option);
            });

            // Add "Other" as catch-all
            const otherOpt = document.createElement('option');
            otherOpt.value = "OTHER";
            otherOpt.textContent = "Other (Enter in Message)";
            makeSelect.appendChild(otherOpt);

            makeSelect.disabled = false;
        } catch (error) {
            console.error('Error fetching makes:', error);
            makeSelect.innerHTML = '<option value="" disabled selected>Error loading makes</option>';
        }
    }

    // Initialize makes list immediately
    fetchMakes();

    // 3. Handle Year/Make Changes for Models
    async function updateModels() {
        const year = yearSelect.value;
        const make = makeSelect.value;

        if (!year || !make) return;

        modelSelect.disabled = true;
        modelSelect.innerHTML = '<option value="" disabled selected>Loading Models...</option>';

        try {
            const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${encodeURIComponent(make)}/modelyear/${year}?format=json`);
            const json = await response.json();

            const models = json.Results.map(r => r.Model_Name).sort();

            modelSelect.innerHTML = '<option value="" disabled selected>Model</option>';
            if (models.length === 0) {
                const option = document.createElement('option');
                option.value = "Other";
                option.textContent = "Model Not Found (Enter in Message)";
                modelSelect.appendChild(option);
            } else {
                models.forEach(model => {
                    const option = document.createElement('option');
                    option.value = model;
                    option.textContent = model;
                    modelSelect.appendChild(option);
                });
            }
            modelSelect.disabled = false;
        } catch (error) {
            console.error('Error fetching models:', error);
            modelSelect.innerHTML = '<option value="" disabled selected>Error loading models</option>';
        }
    }

    yearSelect.addEventListener('change', updateModels);
    makeSelect.addEventListener('change', updateModels);
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
