document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle logic
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const authButtonsDesktop = document.querySelector('.auth-buttons-desktop');

    menuToggle.addEventListener('click', () => {
        // Toggles the 'is-active' class on the nav menu to show/hide it
        navMenu.classList.toggle('is-active');
        // Changes the icon between bars and times (X)
        const menuIcon = menuToggle.querySelector('i');
        menuIcon.classList.toggle('fa-bars');
        menuIcon.classList.toggle('fa-times');
        // Prevents background scrolling when the menu is open
        document.body.classList.toggle('no-scroll');
    });

    // Closes the mobile menu when a navigation link is clicked
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('is-active');
            const menuIcon = menuToggle.querySelector('i');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
            document.body.classList.remove('no-scroll');
        });
    });

    // Handles the display of navigation elements based on screen size
    const setNavState = () => {
        if (window.innerWidth >= 768) {
            // Desktop view: hides mobile menu and shows desktop buttons
            navMenu.classList.remove('is-active');
            navMenu.style.display = 'flex';
            authButtonsDesktop.style.display = 'flex';
            menuToggle.style.display = 'none';
            document.body.classList.remove('no-scroll');
        } else {
            // Mobile view: shows mobile toggle and hides desktop buttons
            navMenu.style.display = '';
            menuToggle.style.display = 'block';
            authButtonsDesktop.style.display = 'none';
        }
    };

    window.addEventListener('resize', setNavState);
    setNavState();

    // Modal elements and button selectors
    const loginModal = document.getElementById('login-modal');
    const signupModal = document.getElementById('signup-modal');
    const showLoginBtns = document.querySelectorAll('#show-login-desktop, #show-login-mobile-hero');
    const showSignupBtns = document.querySelectorAll('#show-signup-desktop, #show-signup-mobile-hero');
    const closeBtns = document.querySelectorAll('.close-btn');

    // Form elements and error messages
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginError = document.getElementById('login-error');
    const signupError = document.getElementById('signup-error');

    // Function to open a modal
    function openModal(modal) {
        modal.classList.add('is-active');
        document.body.classList.add('no-scroll');
    }

    // Function to close a modal
    function closeModal(modal) {
        modal.classList.remove('is-active');
        document.body.classList.remove('no-scroll');
        resetForms();
    }

    // Function to reset form fields and error messages
    function resetForms() {
        if (loginForm) loginForm.reset();
        if (signupForm) signupForm.reset();
        if (loginError) loginError.textContent = '';
        if (signupError) signupError.textContent = '';
    }

    // Intersection Observer for scroll animations
    const sections = document.querySelectorAll('section');
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
            navMenu.classList.remove('is-active');
            const menuIcon = menuToggle.querySelector('i');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        });
    });

    showSignupBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            closeModal(loginModal);
            openModal(signupModal);
            navMenu.classList.remove('is-active');
            const menuIcon = menuToggle.querySelector('i');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        });
    });

    // Event listeners to close modals when the 'x' button is clicked
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

    // Handle Login Form Submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const userType = document.getElementById('user-type-login').value;

        if (email === '' || password === '') {
            loginError.textContent = 'Please fill in all fields.';
            return;
        }

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

        if (name === '' || email === '' || password === '') {
            signupError.textContent = 'Please fill in all fields.';
            return;
        }

        console.log(`New user signed up: Name: ${name}, Email: ${email}, Type: ${userType}`);
        alert('Signup Successful! You can now log in.');
        closeModal(signupModal);
    });
});