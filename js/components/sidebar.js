function initSidebar() {
    const widget = document.querySelector('.widget');
    const box = document.querySelector('.box');
    
    if (box.classList.contains('hidden')) {
        box.classList.remove('hidden');
    }
    
    widget.addEventListener('click', function(e) {
        e.preventDefault();
        box.classList.toggle('hidden');
        
    });
}
