document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.sidebar');
    const blogsContainer = document.getElementById('blogsContainer');
    
    // Function to check if we're on mobile
    function isMobile() {
        return window.innerWidth <= 767; // Common mobile breakpoint
    }
    
    // Function to hide/show sidebar based on blog container visibility
    function updateSidebarVisibility() {
        if (isMobile() && blogsContainer.classList.contains('visible')) {
            sidebar.style.display = 'none';
        } else {
            sidebar.style.display = ''; // Reset to default display value
        }
    }
    
    // Add event listener to blog toggle
    document.getElementById('toggleBlogs').addEventListener('click', function() {
        // Small timeout to allow the 'visible' class to be added first
        setTimeout(updateSidebarVisibility, 10);
    });
    
    // Add event listener to blog close button (dynamically created)
    document.addEventListener('click', function(e) {
        if (e.target.closest('.blog-close-btn')) {
            // Small timeout to allow the 'visible' class to be removed first
            setTimeout(updateSidebarVisibility, 10);
        }
    });
    
    // Update on window resize
    window.addEventListener('resize', updateSidebarVisibility);
    
    // Initial check
    updateSidebarVisibility();
});
