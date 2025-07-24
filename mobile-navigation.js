/* ENKAJI TRAVELS - MOBILE NAVIGATION JAVASCRIPT */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuOpeners = document.querySelectorAll('.eltd-mobile-menu-opener');
    const mobileNavs = document.querySelectorAll('.eltd-mobile-nav');
    
    mobileMenuOpeners.forEach((opener, index) => {
        const nav = mobileNavs[index];
        
        if (opener && nav) {
            opener.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Toggle active classes
                opener.classList.toggle('active');
                nav.classList.toggle('active');
                
                // Toggle body class for content adjustment
                document.body.classList.toggle('mobile-nav-open');
                
                // Close other mobile menus if multiple exist
                mobileNavs.forEach((otherNav, otherIndex) => {
                    if (otherIndex !== index) {
                        otherNav.classList.remove('active');
                        mobileMenuOpeners[otherIndex].classList.remove('active');
                    }
                });
            });
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const isMenuOpener = e.target.closest('.eltd-mobile-menu-opener');
        const isMenuContent = e.target.closest('.eltd-mobile-nav');
        
        if (!isMenuOpener && !isMenuContent) {
            mobileNavs.forEach(nav => nav.classList.remove('active'));
            mobileMenuOpeners.forEach(opener => opener.classList.remove('active'));
            document.body.classList.remove('mobile-nav-open');
        }
    });
    
    // Close mobile menu when clicking on menu links
    const mobileMenuLinks = document.querySelectorAll('.eltd-mobile-nav a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNavs.forEach(nav => nav.classList.remove('active'));
            mobileMenuOpeners.forEach(opener => opener.classList.remove('active'));
            document.body.classList.remove('mobile-nav-open');
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1024) {
            mobileNavs.forEach(nav => nav.classList.remove('active'));
            mobileMenuOpeners.forEach(opener => opener.classList.remove('active'));
            document.body.classList.remove('mobile-nav-open');
        }
    });
    
    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add CSS and JS files to head
function addMobileImprovements() {
    // Add CSS
    const cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = 'mobile-improvements.css';
    cssLink.type = 'text/css';
    document.head.appendChild(cssLink);
    
    // Add viewport meta tag if not present
    if (!document.querySelector('meta[name="viewport"]')) {
        const viewport = document.createElement('meta');
        viewport.name = 'viewport';
        viewport.content = 'width=device-width, initial-scale=1.0, user-scalable=yes';
        document.head.appendChild(viewport);
    }
}

// Initialize improvements
addMobileImprovements();