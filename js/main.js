// Main JavaScript file that initializes all components

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// Prevent context menu and text selection for better mobile experience
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});
document.addEventListener('dragstart', function(e) {
    e.preventDefault();
});
document.body.style.userSelect = 'none';

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Theme switching
    initThemeToggle();
    
    // Sidebar functionality
    initSidebar();
    
    // Blog functionality
    initBlogSystem();
    
    // UI enhancements
    initCustomCursor();
    initParticles();
    initScrollAnimations();
    
    console.log('All components initialized successfully!');
});
