function initParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.classList.add('particles-container');
    document.body.appendChild(particlesContainer);
    
    const particleCount = window.innerWidth < 768 ? 15 : 30;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    const posX = Math.random() * window.innerWidth;
    const posY = Math.random() * window.innerHeight + window.innerHeight; // Start below the screen
    
    const size = Math.random() * 5 + 1;
    const opacity = Math.random() * 0.5 + 0.1;
    const duration = Math.random() * 60 + 30;
    
    particle.style.left = `${posX}px`;
    particle.style.top = `${posY}px`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.opacity = opacity;
    particle.style.animationDuration = `${duration}s`;
    
    container.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
        createParticle(container);
    }, duration * 1000);
}
