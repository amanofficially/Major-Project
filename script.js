/**
 * Quick Schedule - Main JavaScript File
 *
 * This script handles all interactive elements of the Quick Schedule landing page,
 * including mobile menu toggles, modal pop-ups for login/signup,
 * form validation, and scroll-based animations.
 */
document.addEventListener('DOMContentLoaded', function () {
    // --- DOM ELEMENT SELECTION ---
    // Navigation elements
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const authButtonsDesktop = document.querySelector('.auth-buttons-desktop');
    const heroAuthButtonsMobile = document.querySelector('.hero-auth-buttons-mobile');

    // Modal elements and their triggers
    const loginModal = document.getElementById('login-modal');
    const signupModal = document.getElementById('signup-modal');
    const showLoginBtns = document.querySelectorAll('#show-login-desktop, #show-login-mobile-hero');
    const showSignupBtns = document.querySelectorAll('#show-signup-desktop, #show-signup-mobile-hero');
    const closeBtns = document.querySelectorAll('.close-btn');

    // Form elements and error message displays
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginError = document.getElementById('login-error');
    const signupError = document.getElementById('signup-error');

    // Sections for scroll-based animations
    const sections = document.querySelectorAll('section');


    // --- UTILITY FUNCTIONS ---
    /**
     * Opens a modal and prevents background scrolling.
     * @param {HTMLElement} modal - The modal element to open.
     */
    const openModal = (modal) => {
        modal.classList.add('is-active');
        document.body.classList.add('no-scroll');
    };

    /**
     * Closes a modal and re-enables background scrolling.
     * Also resets the forms within the modal.
     * @param {HTMLElement} modal - The modal element to close.
     */
    const closeModal = (modal) => {
        modal.classList.remove('is-active');
        document.body.classList.remove('no-scroll');
        resetForms();
    };

    /**
     * Resets form fields and clears any error messages.
     */
    const resetForms = () => {
        if (loginForm) loginForm.reset();
        if (signupForm) signupForm.reset();
        if (loginError) loginError.textContent = '';
        if (signupError) signupError.textContent = '';
    };

    /**
     * Manages the visibility of navigation elements based on screen size.
     */
    const setNavState = () => {
        if (window.innerWidth >= 768) {
            // Desktop view: hides mobile-specific elements and shows desktop ones
            navMenu.classList.remove('is-active');
            navMenu.style.display = 'flex';
            authButtonsDesktop.style.display = 'flex';
            menuToggle.style.display = 'none';
            heroAuthButtonsMobile.style.display = 'none'; // Ensure mobile hero buttons are hidden
            document.body.classList.remove('no-scroll');
        } else {
            // Mobile view: shows mobile-specific elements and hides desktop ones
            navMenu.style.display = '';
            menuToggle.style.display = 'block';
            authButtonsDesktop.style.display = 'none';
            heroAuthButtonsMobile.style.display = 'flex'; // Ensure mobile hero buttons are visible
        }
    };


    // --- EVENT LISTENERS ---

    // Mobile menu toggle logic
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('is-active');
        const menuIcon = menuToggle.querySelector('i');
        menuIcon.classList.toggle('fa-bars');
        menuIcon.classList.toggle('fa-times');
        document.body.classList.toggle('no-scroll');
    });

    // Close mobile menu when a navigation link is clicked
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('is-active');
            const menuIcon = menuToggle.querySelector('i');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
            document.body.classList.remove('no-scroll');
        });
    });

    // Handle initial navigation state and state on window resize
    window.addEventListener('resize', setNavState);
    setNavState();

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Event listeners to show modals
    showLoginBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            closeModal(signupModal);
            openModal(loginModal);
        });
    });

    showSignupBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            closeModal(loginModal);
            openModal(signupModal);
        });
    });

    // Event listeners to close modals via the 'x' button
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            if (modal) closeModal(modal);
        });
    });

    // Close modal when clicking outside the content area
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });


    // --- FORM SUBMISSION HANDLERS ---

    // Handle Login Form Submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const userType = document.getElementById('user-type-login').value;

        if (!email || !password) {
            loginError.textContent = 'Please fill in all fields.';
            return;
        }

        // Simple validation for demonstration purposes
        if (email === 'admin@quick.com' && password === 'admin123' && userType === 'admin') {
            alert('Admin Login Successful! 🎉');
            closeModal(loginModal);
        } else if (email === 'faculty@quick.com' && password === 'faculty123' && userType === 'faculty') {
            alert('Faculty Login Successful! 🥳');
            closeModal(loginModal);
        } else {
            loginError.textContent = 'Invalid email or password.';
        }
    });

    // Handle Signup Form Submission
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const userType = document.getElementById('user-type-signup').value;

        if (!name || !email || !password) {
            signupError.textContent = 'Please fill in all fields.';
            return;
        }

        console.log(`New user signed up: Name: ${name}, Email: ${email}, Type: ${userType}`);
        alert('Signup Successful! You can now log in.');
        closeModal(signupModal);
    });
});
