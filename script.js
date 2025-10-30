document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form Validation
    const emailInput = document.getElementById('email');
    const signupBtn = document.querySelector('.signup-btn');
    const formMessage = document.querySelector('.form-message');
    
    if (emailInput && signupBtn) {
        // Clear error on focus
        emailInput.addEventListener('focus', function() {
            formMessage.textContent = '';
            formMessage.classList.remove('error');
        });
        
        signupBtn.addEventListener('click', function() {
            const email = emailInput.value.trim();
            
            if (!email) {
                showFormError('Please enter your email address');
                return;
            }
            
            if (!isValidEmail(email)) {
                showFormError('Please enter a valid email address');
                return;
            }
            
            // Show "Signing up..." message
            signupBtn.textContent = 'Signing up...';
            signupBtn.disabled = true;
            
            // Simulate form submission (would be replaced with actual API call)
            setTimeout(function() {
                formMessage.textContent = 'Success! Check your email to get started.';
                formMessage.classList.remove('error');
                formMessage.classList.add('success');
                emailInput.value = '';
                signupBtn.textContent = 'Sign up - it\'s free!';
                signupBtn.disabled = false;
            }, 1500);
        });
    }
    
    function showFormError(message) {
        formMessage.textContent = message;
        formMessage.classList.add('error');
        formMessage.classList.remove('success');
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.toLowerCase());
    }
    
    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    const animatedElements = document.querySelectorAll('.hero-content, .hero-video, .section-header');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Feature Card Hover Effects for Trello 101 Section
    const featureCards = document.querySelectorAll('.trello-101 .feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Animate Trello 101 elements on scroll
    const trello101Elements = document.querySelectorAll('.trello-101 .feature-card, .trello-101 .trello-app-preview');
    trello101Elements.forEach((el, index) => {
        // Add a slight delay to each card for a staggered effect
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Add animation classes to Trello 101 section header
    const trello101Header = document.querySelector('.trello-101 .section-header');
    if (trello101Header) {
        trello101Header.classList.add('fade-in');
        observer.observe(trello101Header);
    }
    
    // Header scroll behavior
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down & past the header height
            header.classList.add('hide');
        } else {
            // Scrolling up
            header.classList.remove('hide');
        }
        
        lastScrollTop = scrollTop;
    });
});