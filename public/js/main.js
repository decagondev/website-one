// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navList = document.querySelector('.nav-list');
  
  if (mobileMenuToggle && navList) {
    mobileMenuToggle.addEventListener('click', function() {
      navList.classList.toggle('active');
      
      // Toggle animation for hamburger to X
      const bars = this.querySelectorAll('.bar');
      bars.forEach(bar => bar.classList.toggle('active'));
      
      // Toggle aria-expanded for accessibility
      const expanded = this.getAttribute('aria-expanded') === 'true' || false;
      this.setAttribute('aria-expanded', !expanded);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!navList.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
        navList.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        
        const bars = mobileMenuToggle.querySelectorAll('.bar');
        bars.forEach(bar => bar.classList.remove('active'));
      }
    });
  }
  
  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href !== '#') {
        e.preventDefault();
        
        const targetElement = document.querySelector(href);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
          
          // Update URL hash
          history.pushState(null, null, href);
        }
      }
    });
  });
  
  // Add active class to nav links based on current page
  const currentLocation = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-list a');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    
    if (linkPath === currentLocation || 
        (linkPath === '/' && currentLocation === '/index.html') || 
        (currentLocation === '/' && linkPath === '/')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
  
  // Implement simple form validation if contact form exists
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      let isValid = true;
      
      // Simple validation for required fields
      const requiredFields = contactForm.querySelectorAll('[required]');
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
          
          // Add error message if not already present
          const errorElement = field.parentNode.querySelector('.error-message');
          if (!errorElement) {
            const message = document.createElement('div');
            message.className = 'error-message';
            message.textContent = 'This field is required';
            field.parentNode.appendChild(message);
          }
        } else {
          field.classList.remove('error');
          const errorElement = field.parentNode.querySelector('.error-message');
          if (errorElement) {
            errorElement.remove();
          }
        }
      });
      
      // Additional email validation
      const emailField = contactForm.querySelector('input[type="email"]');
      if (emailField && emailField.value.trim()) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.value)) {
          isValid = false;
          emailField.classList.add('error');
          
          // Add error message if not already present
          const errorElement = emailField.parentNode.querySelector('.error-message');
          if (!errorElement) {
            const message = document.createElement('div');
            message.className = 'error-message';
            message.textContent = 'Please enter a valid email address';
            emailField.parentNode.appendChild(message);
          }
        }
      }
      
      if (!isValid) {
        e.preventDefault();
      }
    });
    
    // Clean up error styling on input
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
      input.addEventListener('input', function() {
        if (this.value.trim()) {
          this.classList.remove('error');
          const errorElement = this.parentNode.querySelector('.error-message');
          if (errorElement) {
            errorElement.remove();
          }
        }
      });
    });
  }
  
  // Add simple animation for elements entering viewport
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.fade-in, .slide-in');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight - 100) {
        element.classList.add('visible');
      }
    });
  };
  
  // Enhance parallax effect on scroll
  const parallaxElements = document.querySelectorAll('.hero-parallax, .page-header-parallax');
  
  function updateParallax() {
    parallaxElements.forEach(element => {
      // Calculate how far the user has scrolled
      const scrollPosition = window.pageYOffset;
      // Apply transform with a slower scroll rate (0.4 means it moves at 40% the speed of normal scrolling)
      // Use translateY3d for better performance with hardware acceleration
      element.style.transform = `translate3d(0, ${scrollPosition * 0.4}px, 0)`;
    });
  }
  
  // Only enable enhanced parallax on desktop devices (matches our media query in CSS)
  const isDesktop = window.matchMedia('(min-width: 768px)').matches;
  if (isDesktop && parallaxElements.length > 0) {
    window.addEventListener('scroll', updateParallax);
    // Initialize immediately
    updateParallax();
  }
  
  // Initial check on page load
  animateOnScroll();
  
  // Check on scroll
  window.addEventListener('scroll', animateOnScroll);
}); 