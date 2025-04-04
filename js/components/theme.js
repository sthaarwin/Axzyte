// Theme switching functionality

function initThemeToggle() {
    const sunElement = document.querySelector('.sun');
    const moonElement = document.querySelector('.moon');

    // Ensure initial state is correct
    sunElement.style.display = 'none';
    moonElement.style.display = 'block';

    // Add click events to both sun and moon elements for better UX
    sunElement.addEventListener('click', toggleTheme);
    moonElement.addEventListener('click', toggleTheme);

    function toggleTheme(event) {
        event.preventDefault();

        // Prevent rapid clicking during transition
        if (document.body.classList.contains('theme-transitioning')) {
            return;
        }

        // Add transitioning class to prevent multiple clicks
        document.body.classList.add('theme-transitioning');

        // Toggle visibility with animation
        const isSunVisible = sunElement.style.display === 'block';
        
        // Fade out current icon
        if (isSunVisible) {
            sunElement.style.opacity = '0';
            setTimeout(() => {
                sunElement.style.display = 'none';
                moonElement.style.display = 'block';
                // Fade in new icon
                setTimeout(() => {
                    moonElement.style.opacity = '1';
                }, 50);
            }, 300);
        } else {
            moonElement.style.opacity = '0';
            setTimeout(() => {
                moonElement.style.display = 'none';
                sunElement.style.display = 'block';
                // Fade in new icon
                setTimeout(() => {
                    sunElement.style.opacity = '1';
                }, 50);
            }, 300);
        }

        // Toggle theme class
        document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode');

        // Update CSS variables
        updateThemeColors();

        // Log for debugging
        console.log('Theme toggled to:', isSunVisible ? 'dark' : 'light');
        
        // Remove transitioning class after animation completes
        setTimeout(() => {
            document.body.classList.remove('theme-transitioning');
        }, 700);
    }

    function updateThemeColors() {
        const root = document.documentElement;
        const isDarkMode = document.body.classList.contains('dark-mode');

        // Set appropriate colors based on theme
        root.style.setProperty('--pallino-color', isDarkMode ? '#ffffff3f' : '#00000030');
        root.style.setProperty('--sfondo-color', isDarkMode ? '#1a1a1a' : '#ffffff');
        root.style.setProperty('--testo-color', isDarkMode ? '#ffffff' : '#333333');
        root.style.setProperty('--secondo-color', isDarkMode ? '#2d2f33' : '#f0f0f0');
        root.style.setProperty('--terzo-color', isDarkMode ? '#e6e6e6e3' : '#585151');
        root.style.setProperty('--quarto-color', isDarkMode ? '#494949e3' : '#bdbdbde3');
    }
    
    // Add opacity transition to theme icons
    sunElement.style.transition = 'opacity 0.3s ease';
    moonElement.style.transition = 'opacity 0.3s ease';
    sunElement.style.opacity = '1';
    moonElement.style.opacity = '1';
}
