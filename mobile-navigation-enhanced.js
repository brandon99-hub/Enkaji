/* ENKAJI TRAVELS - ENHANCED MOBILE NAVIGATION JAVASCRIPT */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Enhanced Mobile Navigation Initializing...');
    
    // Force mobile CSS to load
    loadMobileCSS();
    
    // Initialize mobile navigation
    initializeMobileNavigation();
    
    // Handle viewport and orientation changes
    handleViewportChanges();
    
    // Fix mobile header positioning
    fixMobileHeaderPositioning();
    
    // Add mobile-specific event listeners
    addMobileEventListeners();
    
    console.log('Enhanced Mobile Navigation Loaded Successfully');
});

// Force load mobile CSS with high priority
function loadMobileCSS() {
    // Remove old mobile improvements CSS
    const oldCSS = document.querySelector('link[href*="mobile-improvements.css"]');
    if (oldCSS) {
        oldCSS.remove();
    }
    
    // Add new comprehensive mobile CSS
    const newCSS = document.createElement('link');
    newCSS.rel = 'stylesheet';
    newCSS.href = 'mobile-responsive-complete.css';
    newCSS.type = 'text/css';
    newCSS.media = 'all';
    newCSS.id = 'mobile-responsive-complete';
    
    // Insert at the beginning of head to ensure it loads first
    document.head.insertBefore(newCSS, document.head.firstChild);
    
    // Add critical viewport meta tag if missing or incorrect
    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
        viewport = document.createElement('meta');
        viewport.name = 'viewport';
        document.head.appendChild(viewport);
    }
    viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
}

// Initialize comprehensive mobile navigation
function initializeMobileNavigation() {
    const mobileMenuOpeners = document.querySelectorAll('.eltd-mobile-menu-opener');
    const mobileNavs = document.querySelectorAll('.eltd-mobile-nav');
    const mobileHeaders = document.querySelectorAll('.eltd-mobile-header');
    
    console.log(`Found ${mobileMenuOpeners.length} menu openers, ${mobileNavs.length} navigation menus`);
    
    // Ensure mobile headers are visible on mobile devices
    if (window.innerWidth <= 1024) {
        mobileHeaders.forEach(header => {
            header.style.display = 'block';
            header.style.visibility = 'visible';
        });
        
        // Hide desktop headers
        const desktopHeaders = document.querySelectorAll('.eltd-page-header');
        desktopHeaders.forEach(header => {
            header.style.display = 'none';
        });
    }
    
    // Initialize each mobile menu
    mobileMenuOpeners.forEach((opener, index) => {
        const nav = mobileNavs[index];
        
        if (opener && nav) {
            // Remove any existing event listeners
            opener.removeEventListener('click', handleMobileMenuClick);
            
            // Add enhanced click handler
            opener.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                console.log('Mobile menu clicked');
                
                // Toggle active states
                const isActive = opener.classList.contains('active');
                
                // Close all other menus first
                mobileMenuOpeners.forEach((otherOpener, otherIndex) => {
                    if (otherIndex !== index) {
                        otherOpener.classList.remove('active');
                        if (mobileNavs[otherIndex]) {
                            mobileNavs[otherIndex].classList.remove('active');
                        }
                    }
                });
                
                // Toggle current menu
                if (isActive) {
                    opener.classList.remove('active');
                    nav.classList.remove('active');
                    document.body.classList.remove('mobile-nav-open');
                } else {
                    opener.classList.add('active');
                    nav.classList.add('active');
                    document.body.classList.add('mobile-nav-open');
                }
                
                // Prevent body scroll when menu is open
                if (nav.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
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
            document.body.style.overflow = '';
        }
    });
    
    // Close mobile menu when clicking on menu links
    const mobileMenuLinks = document.querySelectorAll('.eltd-mobile-nav a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Allow navigation but close menu
            setTimeout(() => {
                mobileNavs.forEach(nav => nav.classList.remove('active'));
                mobileMenuOpeners.forEach(opener => opener.classList.remove('active'));
                document.body.classList.remove('mobile-nav-open');
                document.body.style.overflow = '';
            }, 100);
        });
    });
}

// Handle viewport and orientation changes
function handleViewportChanges() {
    let resizeTimer;
    
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            const width = window.innerWidth;
            
            // Close mobile menu on resize
            const mobileNavs = document.querySelectorAll('.eltd-mobile-nav');
            const mobileMenuOpeners = document.querySelectorAll('.eltd-mobile-menu-opener');
            
            mobileNavs.forEach(nav => nav.classList.remove('active'));
            mobileMenuOpeners.forEach(opener => opener.classList.remove('active'));
            document.body.classList.remove('mobile-nav-open');
            document.body.style.overflow = '';
            
            // Show/hide appropriate headers based on screen size
            if (width > 1024) {
                // Desktop view
                document.querySelectorAll('.eltd-mobile-header').forEach(header => {
                    header.style.display = 'none';
                });
                document.querySelectorAll('.eltd-page-header').forEach(header => {
                    header.style.display = 'block';
                });
            } else {
                // Mobile view
                document.querySelectorAll('.eltd-page-header').forEach(header => {
                    header.style.display = 'none';
                });
                document.querySelectorAll('.eltd-mobile-header').forEach(header => {
                    header.style.display = 'block';
                    header.style.visibility = 'visible';
                });
            }
            
            // Adjust content margin
            adjustContentMargin();
        }, 100);
    });
    
    // Handle orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(function() {
            fixMobileHeaderPositioning();
            adjustContentMargin();
        }, 300);
    });
}

// Fix mobile header positioning issues
function fixMobileHeaderPositioning() {
    const mobileHeaders = document.querySelectorAll('.eltd-mobile-header');
    
    mobileHeaders.forEach(header => {
        if (window.innerWidth <= 1024) {
            header.style.position = 'fixed';
            header.style.top = '0';
            header.style.left = '0';
            header.style.right = '0';
            header.style.zIndex = '99999';
            header.style.width = '100%';
            header.style.background = '#ffffff';
            header.style.display = 'block';
            header.style.visibility = 'visible';
        }
    });
}

// Adjust content margin based on mobile header height
function adjustContentMargin() {
    if (window.innerWidth <= 1024) {
        const mobileHeader = document.querySelector('.eltd-mobile-header');
        const content = document.querySelector('.eltd-content');
        
        if (mobileHeader && content) {
            const headerHeight = mobileHeader.offsetHeight || 60;
            content.style.marginTop = headerHeight + 'px';
            content.style.paddingTop = '0';
        }
    }
}

// Add mobile-specific event listeners
function addMobileEventListeners() {
    // Prevent zoom on input focus (iOS)
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            if (window.innerWidth <= 768) {
                const viewport = document.querySelector('meta[name="viewport"]');
                if (viewport) {
                    viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
                }
            }
        });
        
        input.addEventListener('blur', function() {
            if (window.innerWidth <= 768) {
                const viewport = document.querySelector('meta[name="viewport"]');
                if (viewport) {
                    viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
                }
            }
        });
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
                
                // Close mobile menu if open
                document.querySelectorAll('.eltd-mobile-nav').forEach(nav => nav.classList.remove('active'));
                document.querySelectorAll('.eltd-mobile-menu-opener').forEach(opener => opener.classList.remove('active'));
                document.body.classList.remove('mobile-nav-open');
                document.body.style.overflow = '';
                
                // Smooth scroll to target
                const headerHeight = document.querySelector('.eltd-mobile-header')?.offsetHeight || 60;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Handle touch events for better mobile interaction
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    });
    
    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        
        // Close mobile menu on swipe up (if menu is open)
        const activeNav = document.querySelector('.eltd-mobile-nav.active');
        if (activeNav && touchStartY - touchEndY > 50) {
            activeNav.classList.remove('active');
            document.querySelectorAll('.eltd-mobile-menu-opener').forEach(opener => opener.classList.remove('active'));
            document.body.classList.remove('mobile-nav-open');
            document.body.style.overflow = '';
        }
    });
}

// Handle mobile menu click (for event listener removal)
function handleMobileMenuClick(e) {
    // This function is used for removing old event listeners
}

// Force mobile styles on page load
function forceMobileStyles() {
    if (window.innerWidth <= 1024) {
        // Add mobile body class
        document.body.classList.add('mobile-device');
        
        // Force hide desktop headers
        const style = document.createElement('style');
        style.textContent = `
            @media screen and (max-width: 1024px) {
                .eltd-page-header { display: none !important; }
                .eltd-mobile-header { display: block !important; }
                .eltd-content { margin-top: 60px !important; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize on load
window.addEventListener('load', function() {
    setTimeout(function() {
        forceMobileStyles();
        fixMobileHeaderPositioning();
        adjustContentMargin();
    }, 100);
});

// Export functions for debugging
window.EnkajiMobile = {
    initializeMobileNavigation,
    fixMobileHeaderPositioning,
    adjustContentMargin,
    forceMobileStyles
};