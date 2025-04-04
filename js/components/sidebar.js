// Sidebar toggle functionality

function initSidebar() {
    // Widget toggle functionality
    const widget = document.querySelector('.widget');
    const box = document.querySelector('.box');
    
    // Ensure the box is visible by default
    if (box.classList.contains('hidden')) {
        box.classList.remove('hidden');
    }
    
    widget.addEventListener('click', function(e) {
        e.preventDefault();
        box.classList.toggle('hidden');
        
        // Log for debugging
        console.log('Widget clicked, box hidden state:', box.classList.contains('hidden'));
    });
}
