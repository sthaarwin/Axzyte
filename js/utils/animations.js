// Scroll animations

function initScrollAnimations() {
    // Fade-in animations
    setupFadeInAnimations();
    
    // Parallax effects
    setupParallaxEffects();
}

function setupFadeInAnimations() {
    const elements = document.querySelectorAll('.fade-in-on-scroll');

    function handleScroll() {
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                element.classList.add('visible');
            }
        });
    }
    
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
}

function setupParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.project, .tech .icon, .uses .use');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        parallaxElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const centerY = rect.top + rect.height / 2;
            const viewportHeight = window.innerHeight;
            
            if (centerY > 0 && centerY < viewportHeight) {
                const distance = (centerY - viewportHeight / 2) * 0.05;
                element.style.transform = `translateY(${-distance}px)`;
            }
        });
    });
}
